export function matchIsNumeric(text) {
  const isNumber = typeof text === "number";
  const isString = typeof text === "string";
  return (isNumber || (isString && text !== "")) && !isNaN(Number(text));
}
