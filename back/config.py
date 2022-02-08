import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()

mongo_uri = os.getenv("MONGO_URI")

client = MongoClient(mongo_uri)
db = client["scrapes"]


url = "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all"

empty = {"title": "UNKNOWN TITLE", "author": "ANONYMOUS AUTHOR"}

proxies = {
    "http": "socks5h://127.0.0.1:9050",
    "https": "socks5h://127.0.0.1:9050",
}

port = 8080
