/** Implement the contract described in review.md. */
export function normalizeTags(tags: readonly string[]): string[] {
  let resultTags = [];

  for (let tagElement of tags) {
    let tag = tagElement.toLowerCase().trim();
    if (tag.length > 0 && (resultTags.length === 0 || tag !== resultTags[resultTags.length - 1])) {
      resultTags.push(tag);
    }
  }
  return resultTags;
}

console.log(normalizeTags([" TypeScript ", "", "typescript", "Node.js", " node.js "]));
// ["typescript", "node.js"]
