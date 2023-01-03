import imageType from 'image-type';
import { decodeJpeg } from './decodeJpeg';
import { decodePng } from './decodePng';
import { decodeTiff } from './decodeTiff';
/**
 * Decode input data. Data format is automatically detected.
 * Possible formats: png, jpeg and tiff.
 *
 * @param data - Data to decode.
 * @returns The decoded image.
 */
export function decode(data) {
    const typedArray = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    const type = imageType(typedArray);
    switch (type?.mime) {
        case 'image/png':
            return decodePng(typedArray);
        case 'image/jpeg':
        case 'image/jpg':
            return decodeJpeg(typedArray);
        case 'image/tiff':
            return decodeTiff(typedArray);
        default:
            throw new Error('unrecognized data format');
    }
}
//# sourceMappingURL=decode.js.map