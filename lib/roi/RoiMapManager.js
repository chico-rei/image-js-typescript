"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoiMapManager = void 0;
const ml_matrix_1 = require("ml-matrix");
const getRois_1 = require("./getRois");
class RoiMapManager {
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
        return ml_matrix_1.Matrix.from1DArray(this.map.height, this.map.width, this.map.data).to2DArray();
    }
    getRois(options = {}) {
        return (0, getRois_1.getRois)(this, options);
    }
}
exports.RoiMapManager = RoiMapManager;
//# sourceMappingURL=RoiMapManager.js.map