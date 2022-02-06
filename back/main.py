# command curl --proxy socks5h://127.0.0.1:9050 http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all
from helpers import get
from bs4 import *

empty = {"title": "UNKNOWN TITLE", "author": "ANONYMOUS AUTHOR"}
db = []

url = "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all"

home_res = get(url)

html = BeautifulSoup(home_res, "html.parser")


pastes_list = html.find("section")


def scrape_title(paste):
    title = paste.find("h4")

    if hasattr(title, "text"):
        return title.text.strip()
    else:
        return empty["title"]


def scrape_content(paste):
    ol_list = paste.find("ol")

    if not hasattr(ol_list, "text"):
        # paste must have context!
        return None

    content = ""
    i = 1
    for text in ol_list:
        text = text.text
        stripped = text.strip()
        if text == stripped:
            content += f"{i}. {stripped}\n"
            content += "\n"
            i += 1
    return content


def scrape_author_and_date(paste):
    closure_data = paste.find("div", {"class": "col-sm-6"}).text
    splitted_data = closure_data.strip().split(" ")

    author = splitted_data[2] if bool(splitted_data[2]) else empty["author"]
    date = "".join(map(lambda x: f"{x} ", splitted_data[4:]))

    return [author, date]


for paste in pastes_list:
    # title section
    title = scrape_title(paste)

    # content section
    content = scrape_content(paste)
    if not content:
        continue

    # author and date section
    author, date = scrape_author_and_date(paste)

    # inserting to db
    final_data = {"author": author, "date": date, "content": content, "title": title}
    db.append(final_data)
