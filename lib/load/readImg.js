"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readImg = void 0;
const readCanvas_1 = require("./readCanvas");
// TODO: Create nodejs version that throws an error
/**
 * Read an image from an HTML image source.
 *
 * @param img - Image source such as an <img> or <svg> element.
 * @returns The read image.
 */
function readImg(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (ctx === null) {
        throw new Error('could not get context from canvas element');
    }
    ctx.drawImage(img, 0, 0);
    return (0, readCanvas_1.readCanvas)(canvas);
}
exports.readImg = readImg;
//# sourceMappingURL=readImg.js.map