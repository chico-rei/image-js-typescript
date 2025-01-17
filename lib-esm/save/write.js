import fs from 'node:fs';
import path from 'node:path';
import { Mask, ImageColorModel } from '..';
import { encode, ImageFormat, } from './encode';
/**
 * Asynchronously write an image to the disk.
 *
 * @param path - Path where the image should be written.
 * @param image - Image to save.
 * @param options - Encode options.
 */
export async function write(path, image, options) {
    if (image instanceof Mask) {
        image = image.convertColor(ImageColorModel.GREY);
    }
    const toWrite = getDataToWrite(path, image, options);
    await fs.promises.writeFile(path, toWrite);
}
/**
 * Synchronous version of @see {@link write}.
 *
 * @param path - Path where the image should be written.
 * @param image - Image to save.
 * @param options - Encode options.
 */
export function writeSync(path, image, options) {
    if (image instanceof Mask) {
        image = image.convertColor(ImageColorModel.GREY);
    }
    const toWrite = getDataToWrite(path, image, options);
    fs.writeFileSync(path, toWrite);
}
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
        const extension = path.extname(destinationPath).slice(1).toLowerCase();
        if (extension === 'png') {
            format = ImageFormat.png;
            return encode(image, { format });
        }
        else if (extension === 'jpg' || extension === 'jpeg') {
            format = ImageFormat.jpg;
            return encode(image, { format });
        }
        else {
            throw new Error('image format could not be determined from file extension. Please use a supported extension or specify the format option');
        }
    }
    else if (options.format === ImageFormat.png) {
        return encode(image, options);
    }
    else if (options.format === ImageFormat.jpg ||
        options.format === ImageFormat.jpeg) {
        return encode(image, options);
    }
    else {
        throw new RangeError(`unknown format: ${options.format}`);
    }
}
//# sourceMappingURL=write.js.map