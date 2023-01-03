"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLineLength = void 0;
/**
 * Compute the length of a segment defined by two points.
 *
 * @param p1 - First point.
 * @param p2 - Second point.
 * @returns Length of the segment.
 */
function getLineLength(p1, p2) {
    return Math.sqrt((p1.column - p2.column) ** 2 + (p1.row - p2.row) ** 2);
}
exports.getLineLength = getLineLength;
//# sourceMappingURL=lines.js.map