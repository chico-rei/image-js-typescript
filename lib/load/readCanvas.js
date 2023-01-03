"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCanvas = void 0;
const Image_1 = require("../Image");
/**
 * Read an image from an HTML canvas element.
 *
 * @param canvas - Canvas element.
 * @returns The read image.
 */
function readCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    if (ctx === null) {
        throw new Error('could not get context from canvas element');
    }
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    return new Image_1.Image(imageData.width, imageData.height, {
        data: new Uint8Array(imageData.data.buffer, imageData.data.byteOffset, imageData.data.byteLength),
        colorModel: Image_1.ImageColorModel.RGBA,
    });
}
exports.readCanvas = readCanvas;
//# sourceMappingURL=readCanvas.js.map