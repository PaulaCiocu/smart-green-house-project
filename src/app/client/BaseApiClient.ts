import axios from "axios"

const defaultHeaders = {
  "Content-Type" :"application/json"
};

export const Client = axios.create({
  //specificam proprietati
  baseURL:"http://localhost:8002",
  headers: defaultHeaders,
});
