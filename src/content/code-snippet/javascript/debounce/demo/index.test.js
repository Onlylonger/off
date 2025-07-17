import { debounce } from "./debounce";

describe("Test debounce", () => {
  test("multi time call", () => {
    const clickFn = jest.fn();
    const d = debounce(clickFn, 50);
    d();
    d();
    d();
    await(
      new Promise((re) => {
        setTimeout(() => {
          re();
        }, 50);
      }),
    );
    expect(clickFn).toHaveBeenCalledTimes(1);
  });
});
