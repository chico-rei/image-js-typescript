import { readCanvas } from './readCanvas';
// TODO: Create nodejs version that throws an error
/**
 * Read an image from an HTML image source.
 *
 * @param img - Image source such as an <img> or <svg> element.
 * @returns The read image.
 */
export function readImg(img) {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (ctx === null) {
        throw new Error('could not get context from canvas element');
    }
    ctx.drawImage(img, 0, 0);
    return readCanvas(canvas);
}
//# sourceMappingURL=readImg.js.map