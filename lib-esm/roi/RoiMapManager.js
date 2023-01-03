import { Matrix } from 'ml-matrix';
import { getRois } from './getRois';
export class RoiMapManager {
    constructor(map) {
        this.map = map;
        this.whiteRois = [];
        this.blackRois = [];
    }
    /**
     *Return the ROI map of the RoiMapManager.
     *
     * @returns - The ROI map.
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
     * Returns the ROI map as a correct width and height matrix.
     *
     * @returns The ROI map matrix
     */
    getMapMatrix() {
        return Matrix.from1DArray(this.map.height, this.map.width, this.map.data).to2DArray();
    }
    getRois(options = {}) {
        return getRois(this, options);
    }
}
//# sourceMappingURL=RoiMapManager.js.map