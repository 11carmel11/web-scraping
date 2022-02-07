import axios from "axios";
import { BASE_WEB_DATA, SET_DATA_API, SSE_API } from "./config";

const setWebData = async () => {
  await axios.post(SET_DATA_API, BASE_WEB_DATA);
};

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
