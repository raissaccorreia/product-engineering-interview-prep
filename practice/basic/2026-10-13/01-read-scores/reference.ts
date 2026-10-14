const scores: number[] = [0, 8, -2, 5];
const selected = scores.filter((score) => score >= 0);
const adjusted = selected.map((score) => score + 1);
const total = adjusted.reduce((sum, score) => sum + score, 0);

console.log(scores); // [0, 8, -2, 5]
console.log(selected); // [0, 8, 5]
console.log(adjusted); // [1, 9, 6]
console.log(total); // 16
