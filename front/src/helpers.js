import axios from "axios";
import Sentiment from "sentiment";
import { nanoid } from "nanoid";
import { ContentWord } from "./components/Styled";
import { BASE_WEB_DATA, SET_DATA_API, SSE_API } from "./config";

const sentiment = new Sentiment();

const setWebData = async () => await axios.post(SET_DATA_API, BASE_WEB_DATA);

class Connection extends EventSource {
  constructor(stateSetter) {
    super(SSE_API);
    this.onerror = this.close;
    this.onmessage = ({ data }) => {
      const pastes = JSON.parse(data);
      stateSetter(pastes);
    };
  }
}

const createConnection = (stateSetter) => new Connection(stateSetter);

export const asyncEffect = async (stateSetter) => {
  await setWebData();
  createConnection(stateSetter);
};

export const polarityCheck = ({ content }) => {
  const { score, positive, negative } = sentiment.analyze(content);
  const words = content.replace(/\n/g, " ").split(" ");

  const colorfulSentence = (
    <>
      {words.map((word) => {
        word = word.trim();
        if (!word) return <></>;
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
