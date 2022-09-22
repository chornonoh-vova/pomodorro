export function exhaustiveCheck(x: never): never {
  throw new Error(`Unhandled case ${x}`);
}
