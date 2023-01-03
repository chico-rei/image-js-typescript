import { getOutputImage } from '../utils/getOutputImage';
import flipX from './flipX';
import flipY from './flipY';
/**
 *
 * Apply a flip filter to an image.
 *
 * @param image - Image to process.
 * @param options - Flip options.
 * @returns - The processed image.
 */
export function flip(image, options = {}) {
    const { axis = 'horizontal' } = options;
    let newImage = getOutputImage(image, options, { clone: true });
    if (axis === 'horizontal') {
        return flipX(newImage);
    }
    else if (axis === 'vertical') {
        return flipY(newImage);
    }
    else {
        return flipY(flipX(newImage));
    }
}
//# sourceMappingURL=flip.js.map