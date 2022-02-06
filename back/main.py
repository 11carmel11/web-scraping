# command curl --proxy socks5h://127.0.0.1:9050 http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all
from helpers import get, empty
from bs4 import *


url = "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all"


def scrape_title(paste, title_tag):
    title = paste.find(title_tag)  # h4

    if hasattr(title, "text"):
        return title.text.strip()
    else:
        return empty["title"]


def scrape_content(paste, content_tag):
    content_list = paste.find(content_tag)  # ol

    if not hasattr(content_list, "text"):
        # paste must have context!
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


def scrape_author_and_date(paste, data_tag, data_class):
    closure_data = paste.find(data_tag, {"class": data_class}).text  # div, col-sm-6
    splitted_data = closure_data.strip().split(" ")

    author = splitted_data[2] if bool(splitted_data[2]) else empty["author"]
    date = "".join(map(lambda x: f"{x} ", splitted_data[4:]))

    return [author, date]


def scrape(url, title_tag, content_tag, data_tag, data_class):
    db = []

    home_res = get(url)

    html = BeautifulSoup(home_res, "html.parser")

    pastes_list = html.find("section")

    for paste in pastes_list:
        # title section
        title = scrape_title(paste, title_tag)

        # content section
        content = scrape_content(paste, content_tag)
        if not content:
            continue

        # author and date section
        author, date = scrape_author_and_date(paste, data_tag, data_class)

        # inserting to db
        final_data = {
            "author": author,
            "date": date,
            "content": content,
            "title": title,
        }
        db.append(final_data)

    return db


test_db = scrape(url, "h4", "ol", "div", "col-sm-6")
print(len(test_db))
