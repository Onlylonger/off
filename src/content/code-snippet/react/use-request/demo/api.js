import { request } from "./fetcher";

export const getItem = (params) => {
  return request("https://jsonplaceholder.typicode.com/todos/1", params);
};
