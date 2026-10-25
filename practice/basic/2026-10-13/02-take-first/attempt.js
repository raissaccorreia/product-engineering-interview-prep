"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.takeFirst = takeFirst;
/** Original exercise implementation. Awaiting the student's correction. */
function takeFirst(values, count) {
    var newArray = values.splice(0, count);
    return newArray;
}
console.log(takeFirst(["a", "b", "c"], 4));
