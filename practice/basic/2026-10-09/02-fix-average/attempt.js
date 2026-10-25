"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.average = average;
/** Original exercise implementation. Awaiting the student's correction. */
function average(values) {
    var total = 0;
    var count = 0;
    for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
        var value = values_1[_i];
        if (value) {
            total += value;
            count++;
        }
    }
    return total / count;
}
console.log(average([0]));
console.log(average([1, 2, 3]));
console.log(average([32, -4, 0, 7]));
