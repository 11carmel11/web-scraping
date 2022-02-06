import requests

proxies = {
    "http": "socks5h://127.0.0.1:9050",
    "https": "socks5h://127.0.0.1:9050",
}


def get(url):
    response = requests.get(url, proxies=proxies)
    return response.text
