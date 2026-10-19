export function countLongWords(words: readonly string[], minLength: number): number {
  return words.filter((word) => word.length > minLength).length ?? 0;
}
//The reasoning behind the code is pretty simple: I will filter the words by the length of each component in the array. That's why I chose that filter. Inside that filter, I check whether the word length is greater than the minimum length.
//After that, I check the length of the whole array and add `? 0` to make sure you always return at least 0. Let me check if this is exactly what you asked. Yes, correct. This single line solves the function.
//I decided to test these four cases:
//- an empty array
//- 0
//- -1
//- 4 as the minimum length of the string
console.log(countLongWords(["abelha", "oie", "beterraba"], 4));
console.log(countLongWords([], 4));
console.log(countLongWords(["abelha", "oie", "beterraba"], 0));
console.log(countLongWords(["abelha", "oie", "beterraba"], -1));
