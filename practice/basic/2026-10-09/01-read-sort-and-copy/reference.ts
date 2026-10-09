const prices: number[] = [30, 5, 12];
const copy = [...prices];
const sorted = prices.sort((a, b) => a - b);
const doubled = sorted.map((price) => price * 2);

console.log(prices); // [5, 12, 30]
console.log(copy); // [30, 5, 12]
console.log(sorted === prices); // true
console.log(doubled); // [10, 24, 60]
