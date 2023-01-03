import { Mask } from '../Mask';
/**
 * Generate a mask of an ROI. You can specify the kind of mask you want using the `kind` option.
 *
 * @param roi - The ROI to generate a mask for.
 * @param options - Get mask options.
 * @returns The ROI mask.
 */
export function getMask(roi, options = {}) {
    const { innerBorders = true } = options;
    let mask = new Mask(roi.width, roi.height, { origin: roi.origin });
    for (let row = 0; row < roi.height; row++) {
        for (let column = 0; column < roi.width; column++) {
            if (roi.getMapValue(roi.origin.column + column, roi.origin.row + row) ===
                roi.id) {
                mask.setBit(column, row, 1);
            }
            else {
                mask.setBit(column, row, 0);
            }
        }
    }
    if (!innerBorders) {
        mask.solidFill({ out: mask });
    }
    return mask;
}
//# sourceMappingURL=getMask.js.map