from config import proxies, empty
from bs4 import *
import requests


def request_with_proxy(url):
    response = requests.get(url, proxies=proxies)
    return response.text


def get_html_soup(url):
    page_html = request_with_proxy(url)

    html_soup = BeautifulSoup(page_html, "html.parser")
    return html_soup


def scrape_element(parent_element, element_info):
    element_tag = element_info.get("tag")
    element_class = element_info.get("class")

    if bool(element_class):
        element = parent_element.find(element_tag, {"class": element_class})
    else:
        element = parent_element.find(element_tag)

    return element


def scrape_title(paste, title_info):
    title = scrape_element(paste, title_info)

    if hasattr(title, "text"):
        return title.text.strip()
    else:
        return empty["title"]


def scrape_content(paste, content_info):
    content = scrape_element(paste, content_info)

    if hasattr(content, "text"):
        # paste must have content!
        return content.text.strip()


def scrape_author_and_date(paste, data_info):
    closure_data = scrape_element(paste, data_info)

    splitted_data_by_words = closure_data.text.strip().split(" ")

    author = (
        splitted_data_by_words[2]
        if bool(splitted_data_by_words[2])
        else empty["author"]
    )

    date = "".join(map(lambda x: f"{x} ", splitted_data_by_words[4:]))

    return [author, date]


def scrape(url, pastes_list_info, title_info, content_info, data_info):
    pastes_db = []

    html_soup = get_html_soup(url)

    pastes_list = scrape_element(html_soup, pastes_list_info)

    for paste in pastes_list:
        # title section
        title = scrape_title(paste, title_info)

        # content section
        content = scrape_content(paste, content_info)
        if not content:
            continue

        # author and date section
        author, date = scrape_author_and_date(paste, data_info)

        # inserting to db
        final_data = {
            "title": title,
            "author": author,
            "content": content,
            "date": date,
        }
        pastes_db.append(final_data)

    return pastes_db
