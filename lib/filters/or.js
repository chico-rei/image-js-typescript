"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.or = void 0;
const getOutputImage_1 = require("../utils/getOutputImage");
/**
 * Perform an OR operation on two masks.
 *
 * @param mask - First mask.
 * @param otherMask - Second mask.
 * @param options - Or options.
 * @returns OR of the two masks.
 */
function or(mask, otherMask, options) {
    const newMask = (0, getOutputImage_1.maskToOutputMask)(mask, options);
    if (mask.width !== otherMask.width || mask.height !== otherMask.height) {
        throw new Error('or: both masks must have the same size');
    }
    for (let i = 0; i < newMask.size; i++) {
        if (mask.getBitByIndex(i) || otherMask.getBitByIndex(i)) {
            newMask.setBitByIndex(i, 1);
        }
        else {
            newMask.setBitByIndex(i, 0);
        }
    }
    return newMask;
}
exports.or = or;
//# sourceMappingURL=or.js.map