import { maskToOutputMask } from '../utils/getOutputImage';
/**
 * Fill holes in regions of interest.
 *
 * @param mask - Mask to process.
 * @param options - Flood fill options.
 * @returns The filled mask.
 */
export function solidFill(mask, options = {}) {
    let { allowCorners = false } = options;
    let newImage = maskToOutputMask(mask, options, { clone: true });
    let inverted = mask.invert();
    let cleared = inverted.clearBorder({ allowCorners });
    return newImage.or(cleared, { out: newImage });
}
//# sourceMappingURL=solidFill.js.map