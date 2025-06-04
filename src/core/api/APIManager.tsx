import axios from "axios";
import { Config } from "../config/global";

const APIManager = axios.create({
  baseURL: Config.Urls.API,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default APIManager;
