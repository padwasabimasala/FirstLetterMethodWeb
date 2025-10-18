/**
 * Returns a string with only the first letter of each word, preserving spaces and punctuation.
 * Example: "Hello, world!" => "H, w!"
 */
export default function firstLetters(str: string): string {
  // Use regex to match words and non-word chars
  return str.replace(/\b(\w)\w*\b/g, "$1");
}