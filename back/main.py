# command curl --proxy socks5h://127.0.0.1:9050 http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all
from helpers import get
from bs4 import *

empty = {"title": "UNKNOWN TITLE"}

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
