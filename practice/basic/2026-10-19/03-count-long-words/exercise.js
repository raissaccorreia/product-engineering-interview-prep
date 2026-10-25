"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countLongWords = countLongWords;
function countLongWords(words, minLength) {
    var _a;
    return (_a = words.filter(function (word) { return word.length > minLength; }).length) !== null && _a !== void 0 ? _a : 0;
}
console.log(countLongWords(["abelha", "oie", "beterraba"], 4));
console.log(countLongWords([], 4));
console.log(countLongWords(["abelha", "oie", "beterraba"], 0));
console.log(countLongWords(["abelha", "oie", "beterraba"], -1));
