import capitalize from "./capitalize";

describe("capitalize", () => {
  test("capitalizes the first letter", () => {
    expect(capitalize("john")).toBe("John");
  });

  test("returns empty string for empty input", () => {
    expect(capitalize("")).toBe("");
  });

  test("handles already capitalized words", () => {
    expect(capitalize("Hello")).toBe("Hello");
  });
});
