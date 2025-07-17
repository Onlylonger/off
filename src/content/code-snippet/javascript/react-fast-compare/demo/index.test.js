import { isEqual } from "./react-fast-compare";

describe("Test isEqual", () => {
  test("should object euqal", () => {
    expect(isEqual({ foo: "bar" }, { foo: "bar" })).toBe(true);
  });
  test("should array euqal", () => {
    expect(
      isEqual(
        [1, { a: 2, c: { d: ["nihao"] } }],
        [1, { a: 2, c: { d: ["nihao"] } }],
      ),
    ).toBe(true);
  });
  test("should array not euqal", () => {
    expect(
      isEqual(
        [1, { a: 2, c: { d: ["nihao"] } }],
        [1, { a: 2, c: { d: ["nihao", "test"] } }],
      ),
    ).toBe(false);
  });
});
