"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeJpeg = void 0;
const jpeg_js_1 = require("jpeg-js");
const Image_1 = require("../Image");
/**
 * Decode a jpeg. See the jpeg-js npm module.
 *
 * @param buffer - The data to decode.
 * @returns The decoded image.
 */
function decodeJpeg(buffer) {
    const jpeg = (0, jpeg_js_1.decode)(buffer, {
        useTArray: true,
        maxMemoryUsageInMB: Number.POSITIVE_INFINITY,
        maxResolutionInMP: Number.POSITIVE_INFINITY,
    });
    return new Image_1.Image(jpeg.width, jpeg.height, {
        data: jpeg.data,
        colorModel: Image_1.ImageColorModel.RGBA,
    });
}
exports.decodeJpeg = decodeJpeg;
//# sourceMappingURL=decodeJpeg.js.map