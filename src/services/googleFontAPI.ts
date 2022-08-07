import axios from "axios";
// import * as dotenv from "dotenv";
// dotenv.config();

const API_KEY: string = import.meta.env.VITE_API_KEY as string;
class GoogleFontAPI {
  static get = async () =>
    await axios.get(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${API_KEY}`
    );
}

export default GoogleFontAPI;
