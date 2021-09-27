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
from scrapy_selenium import SeleniumRequest
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC

import json
import time

from selenium_controller import login

NEWS_DOMAIN = "http://a4a78ac10fd88506031e125916eeecbe.3be401a9.libvpn.zuel.edu.cn"

class CnkiNewsSpider(scrapy.Spider):
    name = "cnki_news"

    def start_requests(self):
        # yield SeleniumRequest(
        #     url=NEWS_DOMAIN,
        #     callback=self.parse,
        #     wait_time=10,
        #     wait_until=EC.presence_of_element_located(
        #         (
        #             By.XPATH,
        #             '/html/body/div[1]/div[4]/form/div[4]/input',
        #         )
        #     ),
        # )

        yield Request(
            url=NEWS_DOMAIN,
            callback=self.parse_with_cookies,
        )

    def parse(self, response):
        self.driver = response.request.meta["driver"]

        login(self.driver)

        yield SeleniumRequest(
            url="http://f3442d2d91cfa2485dde859ea753e903.3be401a9.libvpn.zuel.edu.cn/KNS8/DefaultResult/Index?kw=%E5%9B%9B%E5%B7%9D%E6%97%A5%E6%8A%A5&korder=LY",
            callback=self.after_login,
            wait_time=30,
            wait_until=EC.presence_of_element_located(
                (
                    By.XPATH,
                    "/html/body/div[3]/div[2]/div[2]/div[2]/form/div/table",
                )
            ),
        )

    def after_login(self, response):
        time.sleep(2)
        url = response.xpath("/html/body/div[3]/div[2]/div[2]/div[2]/form/div/table/tbody/tr[1]/td[9]/a[2]/@href").get()

        yield SeleniumRequest(
            url="http://f3442d2d91cfa2485dde859ea753e903.3be401a9.libvpn.zuel.edu.cn" + url,
            callback=self.get_more_cookies,
            wait_time=60,
            wait_until=EC.presence_of_element_located(
                (
                    By.XPATH,
                    "/html/body/div[8]/div[2]/div[4]/p[1]",
                )
            ),
        )

    def get_more_cookies(self, response):
        cookies = self.driver.get_cookies()
        with open('cookie.json', 'w') as f:
            f.write(json.dumps(cookies))

        self.driver.close()

        yield response.follow(
            url=NEWS_DOMAIN,
            callback=self.parse_with_cookies,
            dont_filter=True, # The url was scraped at the beginning. dont_filter=True is thus necessary to keep Scrapy continue.
        )

    def parse_with_cookies(self, response):
        with open("cookie.json", "r") as f:
            cookies = json.load(f)

        print(cookies)

        # continue scraping with authenticated session...
        yield response.follow(
            "http://b0c0de4bb33dc4db5f1b4a9a222d91f0.3be401a9.libvpn.zuel.edu.cn/TopLoginNew/api/loginapi/UidLogin?callback=jQuery1113049704050523517584_1630694673204&_=1630694673205",
            self.choose_news_and_year,
            cookies=cookies,
        )

    def choose_news_and_year(self, response):
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
        tr_selectors = response.xpath("//tbody/tr")
        for tr_selector in tr_selectors:
            time.sleep(2)

            abstract_relative_urls = tr_selector.xpath("td[2]/a/@href").get()
            article_relative_urls = tr_selector.xpath("td[3]/ul/li[2]/a/@href").get()

            yield response.follow(
                abstract_relative_urls, self.parse_abstract,
            )
            
            """
            Full articles can be scrapped by python-requests but not scrapy
            """
            yield response.follow(
                parse.urljoin(NEWS_DOMAIN, article_relative_urls), self.parse_article,
            )
            """"""

    def parse_abstract(self, response):
        print(
            f"Article title crawled from abstract: {response.xpath('//h1/text()').get()}"
        )

    def parse_article(self, response):
        print("parse_article")
        print(response.xpath('//h5/text()').get())