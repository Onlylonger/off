import { clsx } from "./classnames";

describe("Test classnames", () => {
  test("Strings (variadic)", () => {
    expect(clsx("foo", true && "bar", "baz")).toBe("foo bar baz");
  });

  test("Objects", () => {
    expect(clsx({ foo: true, bar: false, baz: true })).toBe("foo baz");
  });

  test("Objects (variadic)", () => {
    expect(
      clsx({ foo: true }, { bar: false }, null, { "--foobar": "hello" }),
    ).toBe("foo --foobar");
  });

  test("Arrays", () => {
    expect(clsx(["foo", 0, false, "bar"])).toBe("foo bar");
  });

  test("Arrays (variadic)", () => {
    expect(
      clsx(["foo"], ["", 0, false, "bar"], [["baz", [["hello"], "there"]]]),
    ).toBe("foo bar baz hello there");
  });

  test("Kitchen sink (with nesting)", () => {
    expect(
      clsx(
        "foo",
        [1 && "bar", { baz: false, bat: null }, ["hello", ["world"]]],
        "cya",
      ),
    ).toBe("foo bar hello world cya");
  });
});
