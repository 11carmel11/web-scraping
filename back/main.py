# command curl --proxy socks5h://127.0.0.1:9050 http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all
from helpers import scrape
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


if __name__ == "__main__":
    app.run(port=port)
