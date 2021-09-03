#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@author: michael
"""

from urllib import parse
import scrapy
from scrapy.loader import ItemLoader
from cnki_news.items import CnkiNewsItem
from scrapy.http import Request
import orjson

import requests
from lxml import html

NEWS_DOMAIN = "http://a4a78ac10fd88506031e125916eeecbe.3be401a9.libvpn.zuel.edu.cn"

def authentication_failed(response):
    # TODO: Check the contents of the response and return True if it failed
    # or False if it succeeded.
    if orjson.loads(response.body)["msg"] != "登录成功":
        return True
    else:
        return False


class CnkiNewsSpider(scrapy.Spider):
    name = "cnki_news"

    def start_requests(self):
        return [
            scrapy.FormRequest(
                "http://libvpn.zuel.edu.cn/api/acl_user/login",
                formdata={"account": "WjAwMDE1Njc=", "accountPd": "em5janpmMTIzNDU="},
                callback=self.choose_news_and_year,
            )
        ]

    def choose_news_and_year(self, response):
        if authentication_failed(response):
            self.logger.error("Login failed")
            return

        # continue scraping with authenticated session...
        yield scrapy.FormRequest(
            "http://a4a78ac10fd88506031e125916eeecbe.3be401a9.libvpn.zuel.edu.cn/knavi/newspapers/data/group",
            formdata={"pcode": "CCND", "py": "SCRB", "year": "2020",},
            callback=self.search_encoded_dates,
        )
        yield scrapy.FormRequest(
            "http://a4a78ac10fd88506031e125916eeecbe.3be401a9.libvpn.zuel.edu.cn/knavi/newspapers/data/group",
            formdata={"pcode": "CCND", "py": "SCRB", "year": "2019",},
            callback=self.search_encoded_dates,
        )

    def search_encoded_dates(self, response):
        a_selectors = response.xpath('//dl[@class="jcsecondcol"]/dd/a')
        for a_selector in a_selectors:
            encoded_date = a_selector.xpath("@value").get()
            decoded_date = a_selector.xpath("text()").get()
            
            if decoded_date != "2020-12-26":
                continue

            yield scrapy.FormRequest(
                "http://a4a78ac10fd88506031e125916eeecbe.3be401a9.libvpn.zuel.edu.cn/knavi/newspapers/date/articles",
                formdata={
                    "pcode": "CCND",
                    "py": "SCRB",
                    "pageIndex": "1",
                    "pageSize": "20",
                    "date": encoded_date,
                },
                meta={"decoded_date": decoded_date},
                callback=self.search_news,
            )

    def search_news(self, response):
        tr_selectors = response.xpath('//tbody/tr')
        for tr_selector in tr_selectors:
            abstract_relative_urls = tr_selector.xpath('td[2]/a/@href').get()
            article_relative_urls = tr_selector.xpath('td[3]/ul/li[2]/a/@href').get()

            yield response.follow(
                abstract_relative_urls,
                self.parse_abstract,
            )

            """
            Full articles can be scrapped by python-requests but not scrapy
            """
            cookies = {
                "Cookie": 'Ecp_ClientId=4210902111100966070%7C3210902111101414870%7C; Ecp_ClientIp=202.114.238.223%7C202.114.238.221%7C; Ecp_session=1; SID_kxreader_new=011124; ASP.NET_SessionId=u4zbgor5mhnulbcdyogkbhvq; SID_kns=025123113; cnkiUserKey=f271c4c7-e1db-083b-0889-37934e252592; sajssdk_2015_cross_new_user=1; sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%2217ba4802123909-07adb138519d76-35667c03-1296000-17ba4802124177a%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22%E7%9B%B4%E6%8E%A5%E6%B5%81%E9%87%8F%22%2C%22%24latest_search_keyword%22%3A%22%E6%9C%AA%E5%8F%96%E5%88%B0%E5%80%BC_%E7%9B%B4%E6%8E%A5%E6%89%93%E5%BC%80%22%2C%22%24latest_referrer%22%3A%22%22%7D%2C%22%24device_id%22%3A%2217ba4802123909-07adb138519d76-35667c03-1296000-17ba4802124177a%22%7D; SID_klogin=125143; SID_zwwh=068120; nxgp_language=CHS; Hm_lvt_dcec09ba2227fd02c55623c1bb82776a=1630562862,1630563101,1630563843,1630565689; Hm_lvt_8bd840d04a95ebf6075e729ad8ed6033=1630565837; Hm_lpvt_8bd840d04a95ebf6075e729ad8ed6033=1630565862; SID_krsnew=125132; Hm_lpvt_dcec09ba2227fd02c55623c1bb82776a=1630567994; JSESSIONID=1300DCBBD3D09E37BBA1B8DECB23CE97; ccsess=490b48f964ed1684885f9cba395e1fd1cab9850e6afeeb27f6cf28e0e1e8c1f9; Hm_lvt_7ad0e218cfd89a6bcabf4ce749d7c3db=1630637334; Hm_lpvt_7ad0e218cfd89a6bcabf4ce749d7c3db=1630637334; SID_kcms=124112; SID=zhuye091001; c_m_LinID=LinID=WEEvREcwSlJHSldSdmVqMDh6a1doNkJUOW5PekdkQmJOODBwcmJGNUpXUT0=$9A4hF_YAuvQ5obgVAqNKPCYcEjKensW4IQMovwHtwkF4VYPoHbKxJw!!&ot=09%2f04%2f2021%2010%3a51%3a49; LID=WEEvREcwSlJHSldSdmVqMDh6a1doNkJUOW5PekdkQmJOODBwcmJGNUpXUT0=$9A4hF_YAuvQ5obgVAqNKPCYcEjKensW4IQMovwHtwkF4VYPoHbKxJw!!; Ecp_LoginStuts={"IsAutoLogin":false,"UserName":"WH0023","ShowName":"%e4%b8%ad%e5%8d%97%e8%b4%a2%e7%bb%8f%e6%94%bf%e6%b3%95%e5%a4%a7%e5%ad%a6","UserType":"bk","BUserName":"","BShowName":"","BUserType":"","r":"UCgiqr"}; c_m_expire=2021-09-03%2011%3a16%3a25; acl-poly=s%3AK8ccv1vPuZxR3LXRhp4aAQV4OgDQP0Q6.5653k0B3GdQt6pSP7Y2Rs7DdfY0OGE9xxGNGcnKnIgI'
            }
            r = requests.request(
                "GET",
                parse.urljoin(NEWS_DOMAIN, article_relative_urls),
                cookies=cookies,
            )
            self.parse_article(r)
            """"""

    def parse_abstract(self, response):
        print(f"Article title crawled from abstract: {response.xpath('//h1/text()').get()}")
        pass

    def parse_article(self, response):
        tree = html.fromstring(response.content)
        title = tree.xpath("//title/text()")
        print('parse_article')
        print(title)
        pass