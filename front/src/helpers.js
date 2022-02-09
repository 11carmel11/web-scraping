import Sentiment from "sentiment";
import { nanoid } from "nanoid";
import axios from "axios";
import { BASE_WEB_DATA, SET_DATA_API, SSE_API } from "./config";
import { ContentWord } from "./components/Styled";

const sentiment = new Sentiment();

const setWebData = async () => await axios.post(SET_DATA_API, BASE_WEB_DATA);

class Connection extends EventSource {
  constructor(dispatch) {
    super(SSE_API);
    this.onerror = this.close;
    this.onmessage = ({ data }) => {
      const payload = JSON.parse(data);
      const type = "FETCH";

      dispatch({ type, payload });
    };
  }
}

const createConnection = (dispatch) => new Connection(dispatch);

export const asyncEffect = async (dispatch) => {
  await setWebData();
  createConnection(dispatch);
};

export const polarityCheck = ({ content }) => {
  const { score, positive, negative } = sentiment.analyze(content);
  const words = content.replace(/\n/g, " ").split(" ");

  const colorfulSentence = (
    <>
      {words.map((word) => {
        word = word.trim();
        if (!word) return null;
        const lowerCaseWord = word.toLowerCase();

        let color = "inherit";

        if (positive.includes(lowerCaseWord)) {
          color = "chartreuse";
        } else if (negative.includes(lowerCaseWord)) {
          color = "crimson";
        }

        return (
          <ContentWord key={nanoid()} colorName={color}>
            {word}{" "}
          </ContentWord>
        );
      })}
    </>
  );

  return { score, text: colorfulSentence };
};
