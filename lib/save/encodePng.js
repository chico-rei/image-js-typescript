"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodePng = void 0;
const fast_png_1 = require("fast-png");
/**
 * Creates a PNG buffer from an image.
 *
 * @param image - The image instance.
 * @param options - PNG encoding options.
 * @returns The buffer.
 */
function encodePng(image, options) {
    return (0, fast_png_1.encode)(image.getRawImage(), options);
}
exports.encodePng = encodePng;
//# sourceMappingURL=encodePng.js.map