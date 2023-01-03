"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeJpeg = void 0;
const jpeg_js_1 = require("jpeg-js");
const Image_1 = require("../Image");
/**
 * Creates a JPEG buffer from an image.
 *
 * @param image - The image instance.
 * @param options - JPEG encoding options.
 * @returns The buffer.
 */
function encodeJpeg(image, options = {}) {
    const { quality = 50 } = options;
    if (image.colorModel !== Image_1.ImageColorModel.RGBA) {
        image = image.convertColor(Image_1.ImageColorModel.RGBA);
    }
    if (image.depth !== Image_1.ColorDepth.UINT8) {
        image = image.convertDepth(Image_1.ColorDepth.UINT8);
    }
    // Image data after depth conversion will always be UInt8Array
    const buffer = (0, jpeg_js_1.encode)(image.getRawImage(), quality).data;
    return new Uint8Array(buffer, buffer.byteOffset, buffer.byteLength);
}
exports.encodeJpeg = encodeJpeg;
//# sourceMappingURL=encodeJpeg.js.map