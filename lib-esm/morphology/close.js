import { ColorDepth, Image } from '..';
import { checkKernel } from '../utils/checkKernel';
import checkProcessable from '../utils/checkProcessable';
/**
 * In mathematical morphology, the closing of a set A by a structuring element B is the erosion of the dilation of that set (Wikipedia).
 * In image processing, closing is, together with opening, the basic workhorse of morphological noise removal.
 * Opening removes small objects, while closing removes small holes.
 * http://docs.opencv.org/2.4/doc/tutorials/imgproc/opening_closing_hats/opening_closing_hats.html
 *
 * @param image - Image to process.
 * @param options - Close options.
 * @returns Closed image.
 */
export function close(image, options = {}) {
    let { kernel = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
    ], iterations = 1, } = options;
    if (image instanceof Image) {
        checkProcessable(image, 'close', {
            bitDepth: [ColorDepth.UINT1, ColorDepth.UINT8, ColorDepth.UINT16],
            components: 1,
            alpha: false,
        });
    }
    checkKernel(kernel, 'close');
    let newImage = image;
    for (let i = 0; i < iterations; i++) {
        newImage = newImage.dilate({ kernel }).erode({ kernel });
    }
    return newImage;
}
//# sourceMappingURL=close.js.map