import firstLetters from "./firstLetters";

describe("firstLetters", () => {
  test("basic usage", () => {
    expect(firstLetters("Hello world")).toBe("H w");
    expect(firstLetters("Hello, world!")) .toBe("H, w!");
    expect(firstLetters("A quick brown fox.")) .toBe("A q b f.");
    expect(firstLetters("One")) .toBe("O");
    expect(firstLetters("")).toBe("");
    expect(firstLetters("  Leading and trailing  ")).toBe("  L a t  ");
    expect(firstLetters("Don't stop.")) .toBe("D s.");
  });
});