"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = exports.ImageFormat = void 0;
const encodeJpeg_1 = require("./encodeJpeg");
const encodePng_1 = require("./encodePng");
var ImageFormat;
(function (ImageFormat) {
    ImageFormat["png"] = "png";
    ImageFormat["jpg"] = "jpg";
    ImageFormat["jpeg"] = "jpeg";
})(ImageFormat = exports.ImageFormat || (exports.ImageFormat = {}));
const defaultPng = { format: ImageFormat.png };
/**
 * Encode an image in JPEG or PNG format.
 *
 * @param image - Image to encode.
 * @param options - Encoding options.
 * @returns The encoded image.
 */
function encode(image, options = defaultPng) {
    if (options.format === ImageFormat.png) {
        return (0, encodePng_1.encodePng)(image, options.encoderOptions);
    }
    else if (options.format === ImageFormat.jpg ||
        options.format === ImageFormat.jpeg) {
        return (0, encodeJpeg_1.encodeJpeg)(image, options.encoderOptions);
    }
    else {
        throw new RangeError(`unknown format: ${options.format}`);
    }
}
exports.encode = encode;
//# sourceMappingURL=encode.js.map