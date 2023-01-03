"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeCanvas = void 0;
const Image_1 = require("../Image");
// TODO: Create nodejs version that throws an error
/**
 * Draw the image in an HTML canvas.
 *
 * @param image - The image to draw.
 * @param canvas - The HTML canvas.
 * @param options - Write canvas options.
 */
function writeCanvas(image, canvas, options = {}) {
    if (image.colorModel !== Image_1.ImageColorModel.RGBA) {
        image = image.convertColor(Image_1.ImageColorModel.RGBA);
    }
    const { resizeCanvas = true, dx = 0, dy = 0, dirtyX = 0, dirtyY = 0, dirtyWidth = image.width, dirtyHeight = image.height, } = options;
    if (resizeCanvas) {
        canvas.width = image.width;
        canvas.height = image.height;
    }
    const ctx = canvas.getContext('2d');
    if (ctx === null) {
        throw new Error('could not get context from canvas element');
    }
    const data = image.getRawImage().data;
    ctx.putImageData(new ImageData(new Uint8ClampedArray(data.buffer, data.byteOffset, data.byteLength), image.width, image.height), dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight);
}
exports.writeCanvas = writeCanvas;
//# sourceMappingURL=writeCanvas.js.map