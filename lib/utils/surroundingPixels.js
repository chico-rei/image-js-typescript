"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.surroundingPixels = void 0;
/**
 * Coordinates of the surrounding pixels relative to the current pixel.
 * First pixel is the one on the right, then they are in clockwise order.
 */
exports.surroundingPixels = [
    { row: 0, column: 1 },
    { row: 1, column: 1 },
    { row: 1, column: 0 },
    { row: 1, column: -1 },
    { row: 0, column: -1 },
    { row: -1, column: -1 },
    { row: -1, column: 0 },
    { row: -1, column: 1 },
];
//# sourceMappingURL=surroundingPixels.js.map