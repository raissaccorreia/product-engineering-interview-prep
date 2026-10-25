"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withoutLabel = withoutLabel;
/** Original exercise implementation. Awaiting the student's correction. */
function withoutLabel(labels, target) {
    var index = labels.indexOf(target);
    if (index >= 0) {
        labels.splice(index, 1);
    }
    return labels;
}
