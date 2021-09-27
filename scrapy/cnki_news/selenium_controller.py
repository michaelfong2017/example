import time
from local_param import username, password

def login(driver):
    '''
    LOGIN BEGIN
    '''
    # locate username field
    username_input = driver.find_element_by_xpath('/html/body/div[1]/div[4]/form/div[1]/input')
    username_input.send_keys(username)

    time.sleep(0.5)

    # password field
    password_input = driver.find_element_by_xpath('/html/body/div[1]/div[4]/form/div[2]/input')
    password_input.send_keys(password)

    time.sleep(6)

    # locate submit button by_class_name and .click() to mimic button click
    try:
        login_button = driver.find_element_by_xpath('/html/body/div[1]/div[4]/form/div[4]/input')
        login_button.click()
    except:
        pass

    # Wait for login complete
    driver.implicitly_wait(10)
    me = driver.find_element_by_xpath('/html/body/header/div[2]/ul/li[1]/a/span[3]')
    '''
    LOGIN END
    '''