"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.and = void 0;
const getOutputImage_1 = require("../utils/getOutputImage");
/**
 * Perform an AND operation on two masks.
 *
 * @param mask - First mask.
 * @param otherMask - Second mask.
 * @param options - And options.
 * @returns AND of the two masks.
 */
function and(mask, otherMask, options) {
    const newMask = (0, getOutputImage_1.maskToOutputMask)(mask, options);
    if (mask.width !== otherMask.width || mask.height !== otherMask.height) {
        throw new Error('and: both masks must have the same size');
    }
    for (let i = 0; i < newMask.size; i++) {
        if (mask.getBitByIndex(i) && otherMask.getBitByIndex(i)) {
            newMask.setBitByIndex(i, 1);
        }
        else {
            newMask.setBitByIndex(i, 0);
        }
    }
    return newMask;
}
exports.and = and;
//# sourceMappingURL=and.js.map