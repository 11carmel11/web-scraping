# command curl --proxy socks5h://127.0.0.1:9050 http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all
from helpers import scrape, insert_to_collection
from config import port

from flask import Flask, request, Response
from flask_cors import CORS, cross_origin
from functools import partial
from time import sleep
import json


app = Flask(__name__)
CORS(app)

partial_scrappers = {}


@app.route("/")
def index():
    return "hello from index"


@app.route("/set/data", methods=["POST"])
@cross_origin()
def set_scrape_data():
    body = request.json
    url = body.get("url")
    pastes_list_info = body.get("pastesListInfo")
    title_info = body.get("titleInfo")
    content_info = body.get("contentInfo")
    data_info = body.get("dataInfo")
    pagination_info = body.get("paginationInfo")

    partial_scrappers[url] = partial(
        scrape,
        url,
        pastes_list_info,
        title_info,
        content_info,
        data_info,
        pagination_info,
    )

    return "data set"


@app.route("/stream")
def stream():
    url = request.args.get("url")

    def fetch_data():
        first_scrape = True
        while True:
            relevant_scraper = partial_scrappers[url]
            scrape_db = relevant_scraper(first_scrape=first_scrape)
            data = json.dumps(scrape_db)
            yield f"data: {data} \n\n"
            if not first_scrape:
                insert_to_collection(url, scrape_db)
                sleep(120)
            first_scrape = False

    return Response(fetch_data(), mimetype="text/event-stream")


if __name__ == "__main__":
    app.run(port=port)
