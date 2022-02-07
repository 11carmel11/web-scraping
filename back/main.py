# command curl --proxy socks5h://127.0.0.1:9050 http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all
from helpers import (
    get_html_soup,
    scrape_element,
    scrape_title,
    scrape_content,
    scrape_author_and_date,
)
from config import url, port

from flask import Flask, request
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return "hello from index"


@app.route("/scrape", methods=["POST"])
@cross_origin()
def post_scrape_by_request():
    body = request.json
    url = body.get("url")
    pastes_list_info = body.get("pastesListInfo")
    title_info = body.get("titleInfo")
    content_info = body.get("contentInfo")
    data_info = body.get("dataInfo")
    scrape_db = scrape(url, pastes_list_info, title_info, content_info, data_info)
    return json.dumps(scrape_db)


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


if __name__ == "__main__":
    app.run(port=port)
