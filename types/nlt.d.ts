/**
 * Strongly-typed shape for the NLT JSON used in this project.
 * Top-level: book name -> chapter number -> verse number -> verse text
 */
export type NLTData = Record<
  string,
  Record<string, Record<string, string>>
>;

declare module "*.json" {
  const value: NLTData;
  export default value;
}
