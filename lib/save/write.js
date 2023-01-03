"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeSync = exports.write = void 0;
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const __1 = require("..");
const encode_1 = require("./encode");
/**
 * Asynchronously write an image to the disk.
 *
 * @param path - Path where the image should be written.
 * @param image - Image to save.
 * @param options - Encode options.
 */
async function write(path, image, options) {
    if (image instanceof __1.Mask) {
        image = image.convertColor(__1.ImageColorModel.GREY);
    }
    const toWrite = getDataToWrite(path, image, options);
    await node_fs_1.default.promises.writeFile(path, toWrite);
}
exports.write = write;
/**
 * Synchronous version of @see {@link write}.
 *
 * @param path - Path where the image should be written.
 * @param image - Image to save.
 * @param options - Encode options.
 */
function writeSync(path, image, options) {
    if (image instanceof __1.Mask) {
        image = image.convertColor(__1.ImageColorModel.GREY);
    }
    const toWrite = getDataToWrite(path, image, options);
    node_fs_1.default.writeFileSync(path, toWrite);
}
exports.writeSync = writeSync;
/**
 * Encode the image to the format specified by the file's extension.
 *
 * @param destinationPath - Image destination.
 * @param image - Image to save.
 * @param options - Encode options.
 * @returns Buffer containing the encoded image.
 */
function getDataToWrite(destinationPath, image, options) {
    let format;
    if (options === undefined) {
        const extension = node_path_1.default.extname(destinationPath).slice(1).toLowerCase();
        if (extension === 'png') {
            format = encode_1.ImageFormat.png;
            return (0, encode_1.encode)(image, { format });
        }
        else if (extension === 'jpg' || extension === 'jpeg') {
            format = encode_1.ImageFormat.jpg;
            return (0, encode_1.encode)(image, { format });
        }
        else {
            throw new Error('image format could not be determined from file extension. Please use a supported extension or specify the format option');
        }
    }
    else if (options.format === encode_1.ImageFormat.png) {
        return (0, encode_1.encode)(image, options);
    }
    else if (options.format === encode_1.ImageFormat.jpg ||
        options.format === encode_1.ImageFormat.jpeg) {
        return (0, encode_1.encode)(image, options);
    }
    else {
        throw new RangeError(`unknown format: ${options.format}`);
    }
}
//# sourceMappingURL=write.js.map