const cFetch = (input, init = {}) => {
  const controller = new AbortController();

  return Object.assign(
    fetch(input, {
      ...init,
      signal: controller.signal,
    }).then(async (res) => {
      const contentType = res.headers.get("Content-Type");
      if (contentType) {
        if (contentType.includes("application/json")) {
          return await res.json();
        } else if (contentType.includes("text/plain")) {
          return await res.text();
        }
        return await res.blob();
      }
      return res;
    }),
    {
      abortController: controller,
    },
  );
};

export const getItem = (params) => {
  return cFetch("https://jsonplaceholder.typicode.com/todos/1", params);
};
