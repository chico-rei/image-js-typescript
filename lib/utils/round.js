"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.round = void 0;
/**
 * Round a pixel value.
 *
 * @param value - Value of the pixel.
 * @returns The rounded value.
 */
function round(value) {
    if (value % 0.5 !== 0) {
        return Math.round(value);
    }
    return Math.floor(value) % 2 === 0 ? Math.floor(value) : Math.ceil(value);
}
exports.round = round;
//# sourceMappingURL=round.js.map