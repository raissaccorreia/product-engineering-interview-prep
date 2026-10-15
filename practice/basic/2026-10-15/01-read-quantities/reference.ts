const quantities = new Map<string, number>([
  ["pen", 0],
  ["book", 2],
]);

const penCount = quantities.get("pen") ?? 5;
const missingCount = quantities.get("bag") ?? 5;

quantities.set("book", (quantities.get("book") ?? 0) + 1);

console.log(penCount); // 0
console.log(missingCount); // 5
console.log([...quantities.entries()]); // [["pen", 0], ["book", 3]]
console.log(quantities.size); // 2
