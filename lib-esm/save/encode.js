import { encodeJpeg } from './encodeJpeg';
import { encodePng } from './encodePng';
export var ImageFormat;
(function (ImageFormat) {
    ImageFormat["png"] = "png";
    ImageFormat["jpg"] = "jpg";
    ImageFormat["jpeg"] = "jpeg";
})(ImageFormat || (ImageFormat = {}));
const defaultPng = { format: ImageFormat.png };
/**
 * Encode an image in JPEG or PNG format.
 *
 * @param image - Image to encode.
 * @param options - Encoding options.
 * @returns The encoded image.
 */
export function encode(image, options = defaultPng) {
    if (options.format === ImageFormat.png) {
        return encodePng(image, options.encoderOptions);
    }
    else if (options.format === ImageFormat.jpg ||
        options.format === ImageFormat.jpeg) {
        return encodeJpeg(image, options.encoderOptions);
    }
    else {
        throw new RangeError(`unknown format: ${options.format}`);
    }
}
//# sourceMappingURL=encode.js.map