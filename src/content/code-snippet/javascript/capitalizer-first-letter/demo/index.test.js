import { capitalizeFirstLetter } from "./capitalize-first-letter";

describe("Test capitalizeFirstLetter", () => {
  test("Normal english chras", () => {
    expect(capitalizeFirstLetter("abcde d")).toBe("Abcde d");
  });
  test("multi languages", () => {
    expect(capitalizeFirstLetter("dd你好")).toBe("Dd你好");
  });
  test("space chars", () => {
    expect(capitalizeFirstLetter("  dd  ")).toBe("  Dd  ");
  });
});
