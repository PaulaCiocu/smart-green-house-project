import axios from "axios"

const defaultHeaders = {
  "Content-Type" :"application/json"
};

export const Client = axios.create({
  //specificam proprietati
  baseURL:"https://plant-image3-6i52tjzona-ey.a.run.app",
  headers: defaultHeaders,
});
