import { ColorDepth, Image } from '..';
import { checkKernel } from '../utils/checkKernel';
import checkProcessable from '../utils/checkProcessable';
/**
 * In mathematical morphology, opening is the dilation of the erosion of a set A by a structuring element B.
 * Together with closing, the opening serves in computer vision and image processing as a basic workhorse of morphological noise removal.
 * Opening removes small objects from the foreground (usually taken as the bright pixels) of an image,
 * placing them in the background, while closing removes small holes in the foreground, changing small islands of background into foreground. (Wikipedia)
 * http://docs.opencv.org/2.4/doc/tutorials/imgproc/opening_closing_hats/opening_closing_hats.html
 *
 * @param image - Image to process.
 * @param options - Open options
 * @returns The opened image
 */
export function open(image, options = {}) {
    let { kernel = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
    ], iterations = 1, } = options;
    if (image instanceof Image) {
        checkProcessable(image, 'open', {
            bitDepth: [ColorDepth.UINT1, ColorDepth.UINT8, ColorDepth.UINT16],
            components: 1,
            alpha: false,
        });
    }
    checkKernel(kernel, 'open');
    let newImage = image;
    for (let i = 0; i < iterations; i++) {
        newImage = newImage.erode({ kernel });
        newImage = newImage.dilate({ kernel });
    }
    return newImage;
}
//# sourceMappingURL=open.js.map