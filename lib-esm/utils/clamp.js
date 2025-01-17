/**
 * Get the clamp function for an image (depends on the image bit depth)
 *
 * @param image - The image for which the clamp function is needed.
 * @returns The clamp function.
 */
export function getClamp(image) {
    if (image.maxValue === 255) {
        return clamp255;
    }
    if (image.maxValue === 65535) {
        return clamp65535;
    }
    throw new Error(`unknown maxValue: ${image.maxValue}`);
}
/**
 * Clamp value for 8-bit images.
 *
 * @param value - Value to clamp.
 * @returns The clamped value.
 */
function clamp255(value) {
    return Math.min(Math.max(value, 0), 255);
}
/**
 * Clamp value for 16-bit images.
 *
 * @param value - Value to clamp.
 * @returns The clamped value.
 */
function clamp65535(value) {
    return Math.min(Math.max(value, 0), 65535);
}
/**
 * Get a function that clamps a value to a given range.
 *
 * @param min - Lower threshold.
 * @param max - Upper threshold.
 * @returns The clamping function.
 */
export function getClampFromTo(min, max) {
    return function clamp(value) {
        return Math.max(Math.min(value, max), min);
    };
}
//# sourceMappingURL=clamp.js.map