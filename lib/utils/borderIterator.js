"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borderIterator = void 0;
/**
 * Create function that allows to iterate on the pixels of the border of an image.
 *
 * @param image - Image for which to create the border iterator.
 * @yields - Index of the border pixel.
 */
function* borderIterator(image) {
    for (let col = 0; col < image.width; col++) {
        yield col;
    }
    for (let row = 2; row < image.height; row++) {
        yield row * image.width - 1;
    }
    for (let col = 0; col < image.width; col++) {
        yield image.width * image.height - col - 1;
    }
    for (let row = image.height - 2; row >= 1; row--) {
        yield row * image.width;
    }
}
exports.borderIterator = borderIterator;
//# sourceMappingURL=borderIterator.js.map