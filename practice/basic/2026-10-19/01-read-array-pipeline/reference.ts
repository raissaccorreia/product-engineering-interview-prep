const amounts = [4, 0, -2, 7];

const positiveAmounts = amounts.filter((amount) => amount > 0);
const labels = positiveAmounts.map((amount, index) => `${index}:${amount}`);
const firstTwoLabels = labels.slice(0, 2);

console.log(amounts); // [4, 0, -2, 7]
console.log(positiveAmounts); // [4, 7]
console.log(labels); // ["0:4", "1:7"]
console.log(firstTwoLabels); // ["0:4", "1:7"]
