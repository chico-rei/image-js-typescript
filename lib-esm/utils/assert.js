/**
 * Asserts that value is truthy.
 *
 * @param value - Value to check.
 * @param message - Optional error message to throw.
 */
export function assert(value, message) {
    if (!value) {
        throw new Error(message || 'unreachable');
    }
}
//# sourceMappingURL=assert.js.map