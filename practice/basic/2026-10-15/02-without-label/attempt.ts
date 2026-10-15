/** Original exercise implementation. Awaiting the student's correction. */
export function withoutLabel(labels: string[], target: string): string[] {
  const index = labels.indexOf(target);

  if (index >= 0) {
    labels.splice(index, 1);
  }

  return labels;
}

const labels = ["red", "blue", "red"];
const labels2 = [];
const labels3 = ["blue", "yellow", "green"];

console.log(withoutLabel(labels, "red"));
console.log(withoutLabel(labels2, "red"));
console.log(withoutLabel(labels3, "red"));
