import { borderIterator } from '../utils/borderIterator';
import { multipleFloodFill } from './multipleFloodFill';
/**
 * Set the pixels connected to the border of the mask to zero. You can chose to allow corner connection of not with the `allowCorners` option.
 *
 * @param mask - The mask to process.
 * @param options - Clear border options.
 * @returns The image with cleared borders.
 */
export function clearBorder(mask, options = {}) {
    let { allowCorners = false, out } = options;
    return multipleFloodFill(mask, {
        startPixels: borderIterator(mask),
        startPixelValue: 1,
        newPixelValue: 0,
        allowCorners,
        out,
    });
}
//# sourceMappingURL=clearBorder.js.map