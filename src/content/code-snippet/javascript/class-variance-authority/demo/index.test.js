import { cva } from "./cva";

describe("cva", () => {
  describe("without base", () => {
    describe("without anything", () => {
      test("empty", () => {
        const example = cva();
        expect(example()).toBe("");
        expect(
          example({
            aCheekyInvalidProp: "lol",
          }),
        ).toBe("");
        expect(example({ class: "adhoc-class" })).toBe("adhoc-class");
        expect(example({ className: "adhoc-className" })).toBe(
          "adhoc-className",
        );
        expect(
          example({
            class: "adhoc-class",

            className: "adhoc-className",
          }),
        ).toBe("adhoc-class adhoc-className");
      });

      test("undefined", () => {
        const example = cva(undefined);
        expect(example()).toBe("");
        expect(
          example({
            aCheekyInvalidProp: "lol",
          }),
        ).toBe("");
        expect(example({ class: "adhoc-class" })).toBe("adhoc-class");
        expect(example({ className: "adhoc-className" })).toBe(
          "adhoc-className",
        );
        expect(
          example({
            class: "adhoc-class",

            className: "adhoc-className",
          }),
        ).toBe("adhoc-class adhoc-className");
      });

      test("null", () => {
        const example = cva(null);
        expect(example()).toBe("");
        expect(
          example({
            aCheekyInvalidProp: "lol",
          }),
        ).toBe("");
        expect(example({ class: "adhoc-class" })).toBe("adhoc-class");
        expect(example({ className: "adhoc-className" })).toBe(
          "adhoc-className",
        );
        expect(
          example({
            class: "adhoc-class",

            className: "adhoc-className",
          }),
        ).toBe("adhoc-class adhoc-className");
      });
    });
  });
});
