/**
 * Convert RGB array to 32 bits number where alpha is set to 255.
 *
 * @param rgb - The RGB color array
 * @returns 32 bits number encoding RGBA color
 */
export function rgbToNumber(rgb) {
    return 0xff000000 + (rgb[2] << 16) + (rgb[1] << 8) + rgb[0];
}
//# sourceMappingURL=rgbToNumber.js.map