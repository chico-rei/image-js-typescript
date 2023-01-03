"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decode = void 0;
const image_type_1 = __importDefault(require("image-type"));
const decodeJpeg_1 = require("./decodeJpeg");
const decodePng_1 = require("./decodePng");
const decodeTiff_1 = require("./decodeTiff");
/**
 * Decode input data. Data format is automatically detected.
 * Possible formats: png, jpeg and tiff.
 *
 * @param data - Data to decode.
 * @returns The decoded image.
 */
function decode(data) {
    const typedArray = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    const type = (0, image_type_1.default)(typedArray);
    switch (type?.mime) {
        case 'image/png':
            return (0, decodePng_1.decodePng)(typedArray);
        case 'image/jpeg':
            return (0, decodeJpeg_1.decodeJpeg)(typedArray);
        case 'image/tiff':
            return (0, decodeTiff_1.decodeTiff)(typedArray);
        default:
            throw new Error('unrecognized data format');
    }
}
exports.decode = decode;
//# sourceMappingURL=decode.js.map