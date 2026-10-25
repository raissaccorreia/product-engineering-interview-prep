"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.firstEven = firstEven;
function firstEven(values) {
    var _a;
    return (_a = values.some(function (value) { return value % 2 === 0; })[0]) !== null && _a !== void 0 ? _a : undefined;
}
