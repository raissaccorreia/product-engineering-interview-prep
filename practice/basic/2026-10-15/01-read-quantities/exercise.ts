const quantities = new Map<string, number>([
  ["pen", 0],
  ["book", 2],
]);

const penCount = quantities.get("pen") ?? 5;
const missingCount = quantities.get("bag") ?? 5;

quantities.set("book", (quantities.get("book") ?? 0) + 1);

console.log(penCount);
console.log(missingCount);
console.log([...quantities.entries()]);
console.log(quantities.size);
