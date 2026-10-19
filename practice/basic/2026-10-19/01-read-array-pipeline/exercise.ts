const amounts = [4, 0, -2, 7];

const positiveAmounts = amounts.filter((amount) => amount > 0);
const labels = positiveAmounts.map((amount, index) => `${index}:${amount}`);
const firstTwoLabels = labels.slice(0, 2);

console.log(amounts);
console.log(positiveAmounts);
console.log(labels);
console.log(firstTwoLabels);
