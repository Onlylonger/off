export const debounce = (fn, time = 100) => {
  let timer = null;
  return function (...reset) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    timer = setTimeout(() => {
      fn(...reset);
      timer = null;
    }, time);
  };
};
