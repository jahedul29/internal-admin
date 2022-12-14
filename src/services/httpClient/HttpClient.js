import { getAuthData } from "../auth/auth";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://staging-app-svo.anymessage.cloud",
});

export const getAsync = async (url, authorized = true) => {
  let { token } = getAuthData();
  let headers = getHeaders(authorized ? token : "");

  try {
    let response = await axiosInstance.get(url, { headers: { ...headers } });
    return response;
  } catch (err) {
    return err;
  }
};

function getHeaders(token) {
  let headers = {};
  if (token) {
    headers = {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: token ? `Bearer ${token}` : "",
    };
  }

  return headers;
}
