import { Image } from '..';
import { getOutputImage, maskToOutputMask } from '../utils/getOutputImage';
import { setBlendedPixel } from '../utils/setBlendedPixel';
/**
 * Copy the image to another one by specifying the location in the target image.
 *
 * @param source - The source image.
 * @param target - The target image.
 * @param options - copyTo options.
 * @returns The target with the source copied to it.
 */
export function copyTo(source, target, options = {}) {
    const { origin = { column: 0, row: 0 } } = options;
    const { column, row } = origin;
    if (source.colorModel !== target.colorModel) {
        throw new Error('Source and target should have the same color model.');
    }
    let result;
    if (target instanceof Image) {
        result = getOutputImage(target, options, { clone: true });
    }
    else {
        result = maskToOutputMask(target, options, { clone: true });
    }
    for (let currentRow = Math.max(row, 0); currentRow < Math.min(source.height + row, target.height); currentRow++) {
        for (let currentColumn = Math.max(column, 0); currentColumn < Math.min(source.width + column, target.width); currentColumn++) {
            let sourcePixel = source.getPixel(currentColumn - column, currentRow - row);
            setBlendedPixel(result, currentColumn, currentRow, {
                color: sourcePixel,
            });
        }
    }
    return result;
}
//# sourceMappingURL=copyTo.js.map