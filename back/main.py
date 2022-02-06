# command curl --proxy socks5h://127.0.0.1:9050 http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all
from helpers import get
from bs4 import *

empty = {"title": "UNKNOWN TITLE", "author": "ANONYMOUS AUTHOR"}

url = "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all"

home_res = get(url)

html = BeautifulSoup(home_res, "html.parser")

# titles_list = html.find_all("h4")  # titles

# texts_list = html.find_all("ol")  # texts

pastes_list = html.find("section")

for paste in pastes_list:
    # title section
    title = paste.find("h4")

    if hasattr(title, "text"):
        title = title.text.strip()
    else:
        title = empty["title"]

    # content section
    ol_list = paste.find("ol")

    if not hasattr(ol_list, "text"):
        # paste must have context!
        continue

    content = ""
    i = 1
    for text in ol_list:
        text = text.text
        stripped = text.strip()
        if text == stripped:
            content += f"{i}. {stripped}\n"
            content += "\n"
            i += 1

    # author and date section
    closure_data = paste.find("div", {"class": "col-sm-6"}).text
    splitted_data = closure_data.strip().split(" ")
    author = splitted_data[2]
    date = "".join(map(lambda x: f"{x} ", splitted_data[4:]))
