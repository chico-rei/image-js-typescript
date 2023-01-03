import { getIndex } from '../utils/getIndex';
import { multipleFloodFill } from './multipleFloodFill';
/**
 * Apply a flood fill algorithm to an image.
 *
 * @param mask - Mask to process.
 * @param options - Flood fill options.
 * @returns The filled mask.
 */
export function floodFill(mask, options = {}) {
    let { origin = { row: 0, column: 0 }, allowCorners = false, out } = options;
    const startPixel = getIndex(origin.column, origin.row, mask);
    return multipleFloodFill(mask, {
        startPixels: [startPixel],
        allowCorners,
        out,
    });
}
//# sourceMappingURL=floodFill.js.map