import { ColorDepth, Image } from '..';
import { subtract } from '../compare';
import { checkKernel } from '../utils/checkKernel';
import checkProcessable from '../utils/checkProcessable';
/**
 * In mathematical morphology and digital image processing, a morphological gradient is the difference between the dilation and the erosion of a given image. It is an image where each pixel value (typically non-negative) indicates the contrast intensity in the close neighborhood of that pixel. It is useful for edge detection and segmentation applications.
 * http://docs.opencv.org/2.4/doc/tutorials/imgproc/opening_closing_hats/opening_closing_hats.html
 *
 *
 * @param image - Image to process
 * @param options - Morphological gradient hat options
 * @returns The processed image
 */
export function morphologicalGradient(image, options = {}) {
    let { kernel = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
    ], iterations = 1, } = options;
    if (image instanceof Image) {
        checkProcessable(image, 'bottomHat', {
            bitDepth: [ColorDepth.UINT1, ColorDepth.UINT8, ColorDepth.UINT16],
            components: 1,
            alpha: false,
        });
    }
    checkKernel(kernel, 'morphologicalGradient');
    let newImage = image;
    for (let i = 0; i < iterations; i++) {
        let dilatedImage = newImage.dilate({ kernel });
        let erodedImage = newImage.erode({ kernel });
        newImage = subtract(dilatedImage, erodedImage, { absolute: true });
    }
    return newImage;
}
//# sourceMappingURL=morphologicalGradient.js.map