"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIndex = void 0;
/**
 * Compute the current pixel index based on the value coordinates.
 *
 * @param column - Column of the value.
 * @param row - Row of the value.
 * @param image - The image that is being processed.
 * @param channel - Value channel.
 * @returns The value index.
 */
function getIndex(column, row, image, channel = 0) {
    return (row * image.width + column) * image.channels + channel;
}
exports.getIndex = getIndex;
//# sourceMappingURL=getIndex.js.map