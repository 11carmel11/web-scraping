# command curl --proxy socks5h://127.0.0.1:9050 http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all
from helpers import get, empty
from bs4 import *


url = "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all"


def scrape_element(paste, element_info):
    element_tag = element_info.get("tag")
    element_class = element_info.get("class")

    if bool(element_class):
        element = paste.find(element_tag, {"class": element_class})
    else:
        element = paste.find(element_tag)

    return element


def scrape_title(paste, title_info):
    title = scrape_element(paste, title_info)  # h4

    if hasattr(title, "text"):
        return title.text.strip()
    else:
        return empty["title"]


def scrape_content(paste, content_info):
    content_list = scrape_element(paste, content_info)  # ol

    if not hasattr(content_list, "text"):
        # paste must have content!
        return None

    content = ""
    i = 1
    for text in content_list:
        text = text.text
        stripped = text.strip()
        if text == stripped:
            content += f"{i}. {stripped}\n"
            content += "\n"
            i += 1
    return content


def scrape_author_and_date(paste, data_info):
    closure_data = scrape_element(paste, data_info)  # div, col-sm-6

    splitted_data_by_words = closure_data.text.strip().split(" ")

    author = (
        splitted_data_by_words[2]
        if bool(splitted_data_by_words[2])
        else empty["author"]
    )

    date = "".join(map(lambda x: f"{x} ", splitted_data_by_words[4:]))

    return [author, date]


def scrape(url, pastes_list_info, title_info, content_info, data_info):
    db = []

    home_res = get(url)

    html = BeautifulSoup(home_res, "html.parser")

    pastes_list = scrape_element(html, pastes_list_info)

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
            "author": author,
            "date": date,
            "content": content,
            "title": title,
        }
        db.append(final_data)

    return db


test_db = scrape(
    url,
    {"tag": "section"},
    {"tag": "h4"},
    {"tag": "ol"},
    {"tag": "div", "class": "col-sm-6"},
)
print(test_db)
