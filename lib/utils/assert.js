"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = void 0;
/**
 * Asserts that value is truthy.
 *
 * @param value - Value to check.
 * @param message - Optional error message to throw.
 */
function assert(value, message) {
    if (!value) {
        throw new Error(message || 'unreachable');
    }
}
exports.assert = assert;
//# sourceMappingURL=assert.js.map