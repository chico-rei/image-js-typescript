"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boolToNumber = void 0;
/**
 * Converts a bit value to the corresponding number.
 *
 * @param value - The bit to convert.
 * @returns The bit value as a number.
 */
function boolToNumber(value) {
    let result;
    if (typeof value === 'boolean') {
        result = value ? 1 : 0;
    }
    else {
        result = value;
    }
    return result;
}
exports.boolToNumber = boolToNumber;
//# sourceMappingURL=boolToNumber.js.map