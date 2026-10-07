"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeTags = normalizeTags;
/** Implement the contract described in review.md. */
function normalizeTags(tags) {
    var resultTags = [];
    for (var _i = 0, tags_1 = tags; _i < tags_1.length; _i++) {
        var tagElement = tags_1[_i];
        var tag = tagElement.toLowerCase().trim();
        if (tag.length > 0 && (resultTags.length === 0 || tag !== resultTags[resultTags.length - 1])) {
            resultTags.push(tag);
        }
    }
    return resultTags;
}
console.log(normalizeTags([" TypeScript ", "", "typescript", "Node.js", " node.js "]));
// ["typescript", "node.js"]
