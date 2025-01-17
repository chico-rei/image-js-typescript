import { getBorderPoints } from './getBorderPoints';
import { getMask } from './getMask';
export class Roi {
    constructor(map, id) {
        this.map = map;
        this.id = id;
        this.origin = { row: map.height, column: map.width };
        this.width = 0;
        this.height = 0;
        this.surface = 0;
    }
    /**
     * Get the ROI map of the original image.
     *
     * @returns The ROI map.
     */
    getMap() {
        return this.map;
    }
    /**
     * Return the value at the given coordinates in an ROI map.
     *
     * @param column - Column of the value.
     * @param row - Row of the value.
     * @returns The value at the given coordinates.
     */
    getMapValue(column, row) {
        return this.map.data[this.map.width * row + column];
    }
    /**
     * Return the ratio between the width and the height of the bounding rectangle of the ROI.
     *
     * @returns The width by height ratio.
     */
    getRatio() {
        return this.width / this.height;
    }
    /**
     * Generate a mask of an ROI. You can specify the kind of mask you want using the `kind` option.
     *
     * @param options - Get Mask options
     * @returns The ROI mask.
     */
    getMask(options) {
        return getMask(this, options);
    }
    /**
     * Return an array with the coordinates of the pixels that are on the border of the ROI.
     * The points are defined as [column, row].
     *
     * @param options - Get border points options.
     * @returns The array of border pixels.
     */
    getBorderPoints(options) {
        return getBorderPoints(this, options);
    }
}
//# sourceMappingURL=Roi.js.map