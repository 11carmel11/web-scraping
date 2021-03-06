const DARK_WEB_URL =
  "http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all";

const BASE_SERVER_API = "http://localhost:8080/";

export const SSE_API = BASE_SERVER_API + `stream?url=${DARK_WEB_URL}`;

export const SET_DATA_API = BASE_SERVER_API + "set/data";

export const BASE_WEB_DATA = {
  url: DARK_WEB_URL,
  pastesListInfo: { tag: "section" },
  titleInfo: { tag: "h4" },
  contentInfo: { tag: "ol" },
  dataInfo: { tag: "div", class: "col-sm-6" },
  paginationInfo: {
    tag: "ul",
    class: "pagination",
    next_page_tag_info: {
      tag: "a",
      attr: "href",
    },
  },
};

export const NO_SUCH_PASTE = {
  title: "",
  content: "",
  date: "",
  author: "NO SUCH PASTES",
};
