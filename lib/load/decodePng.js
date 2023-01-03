"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodePng = void 0;
const fast_png_1 = require("fast-png");
const Image_1 = require("../Image");
/**
 * Decode a PNG. See the fast-png npm module.
 *
 * @param buffer - The data to decode.
 * @returns The decoded image.
 */
function decodePng(buffer) {
    const png = (0, fast_png_1.decode)(buffer);
    let colorModel;
    const depth = png.depth === 16 ? Image_1.ColorDepth.UINT16 : Image_1.ColorDepth.UINT8;
    if (png.palette) {
        return loadPalettePng(png);
    }
    switch (png.channels) {
        case 1:
            colorModel = Image_1.ImageColorModel.GREY;
            break;
        case 2:
            colorModel = Image_1.ImageColorModel.GREYA;
            break;
        case 3:
            colorModel = Image_1.ImageColorModel.RGB;
            break;
        case 4:
            colorModel = Image_1.ImageColorModel.RGBA;
            break;
        default:
            throw new Error(`Unexpected number of channels: ${png.channels}`);
    }
    return new Image_1.Image(png.width, png.height, {
        colorModel,
        depth,
        data: png.data,
    });
}
exports.decodePng = decodePng;
/**
 * Compute PNG data from palette information and return a new image.
 *
 * @param png - Decoded PNG.
 * @returns The new image.
 */
function loadPalettePng(png) {
    if (!png.palette) {
        throw new Error('unexpected: there should be a palette when colourType is 3');
    }
    const pixels = png.width * png.height;
    const data = new Uint8Array(pixels * 3);
    const pixelsPerByte = 8 / png.depth;
    const factor = png.depth < 8 ? pixelsPerByte : 1;
    const mask = Number.parseInt('1'.repeat(png.depth), 2);
    let dataIndex = 0;
    for (let i = 0; i < pixels; i++) {
        const index = Math.floor(i / factor);
        let value = png.data[index];
        if (png.depth < 8) {
            value =
                (value >>> (png.depth * (pixelsPerByte - 1 - (i % pixelsPerByte)))) &
                    mask;
        }
        const paletteValue = png.palette[value];
        data[dataIndex++] = paletteValue[0];
        data[dataIndex++] = paletteValue[1];
        data[dataIndex++] = paletteValue[2];
    }
    return new Image_1.Image(png.width, png.height, {
        data,
    });
}
//# sourceMappingURL=decodePng.js.map