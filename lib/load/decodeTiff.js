"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeTiff = void 0;
const tiff_1 = require("tiff");
const __1 = require("..");
const Image_1 = require("../Image");
/**
 * Decode a TIFF. See the tiff module.
 *
 * @param buffer - The data to decode.
 * @returns The decoded image.
 */
function decodeTiff(buffer) {
    let result = (0, tiff_1.decode)(buffer);
    return getImageFromIFD(result[0]);
    // TODO: handle stacks (many IFDs)
}
exports.decodeTiff = decodeTiff;
/**
 * Create image from a single IFD.
 *
 * @param ifd - The IFD.
 * @returns The decoded image.
 */
function getImageFromIFD(ifd) {
    if (ifd.type === 3) {
        // Palette
        const data = new Uint16Array(3 * ifd.width * ifd.height);
        const palette = ifd.palette;
        let ptr = 0;
        for (let index of ifd.data) {
            const color = palette[index];
            data[ptr++] = color[0];
            data[ptr++] = color[1];
            data[ptr++] = color[2];
        }
        return new Image_1.Image(ifd.width, ifd.height, {
            data,
            // TODO: handle alpha properly
            colorModel: ifd.alpha ? __1.ImageColorModel.RGBA : __1.ImageColorModel.RGB,
            // TODO: handle other bit depths
            depth: 16,
            // TODO: implement metadata
            //meta: getMetadata(ifd),
        });
    }
    else {
        return new Image_1.Image(ifd.width, ifd.height, {
            // TODO: handle float data
            // @ts-expect-error float data not handled yet
            data: ifd.data,
            depth: ifd.bitsPerSample,
            colorModel: ifd.type === 2
                ? ifd.alpha
                    ? __1.ImageColorModel.RGBA
                    : __1.ImageColorModel.RGB
                : ifd.alpha
                    ? __1.ImageColorModel.GREYA
                    : __1.ImageColorModel.GREY,
            // meta: getMetadata(ifd),
        });
    }
}
//# sourceMappingURL=decodeTiff.js.map