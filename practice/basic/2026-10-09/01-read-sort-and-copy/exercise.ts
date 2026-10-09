const prices: number[] = [30, 5, 12];
const copy = [...prices];
const sorted = prices.sort((a, b) => a - b);
const doubled = sorted.map((price) => price * 2);

console.log(prices);
console.log(copy);
console.log(sorted === prices);
console.log(doubled);
