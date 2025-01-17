import { copyAlpha } from '..';
import { Image } from '../Image';
import { getOutputImage, maskToOutputMask } from '../utils/getOutputImage';
/**
 * Invert the components of an image.
 *
 * @param image - The image to invert.
 * @param options - Invert options.
 * @returns The inverted image.
 */
export function invert(image, options) {
    if (image instanceof Image) {
        const newImage = getOutputImage(image, options);
        if (image.alpha) {
            copyAlpha(image, newImage);
        }
        const { maxValue, size } = newImage;
        for (let i = 0; i < size; i++) {
            for (let component = 0; component < image.components; component++) {
                newImage.setValueByIndex(i, component, maxValue - image.getValueByIndex(i, component));
            }
        }
        return newImage;
    }
    else {
        const newImage = maskToOutputMask(image, options);
        for (let i = 0; i < newImage.size; i++) {
            newImage.setBitByIndex(i, !image.getBitByIndex(i));
        }
        return newImage;
    }
}
//# sourceMappingURL=invert.js.map