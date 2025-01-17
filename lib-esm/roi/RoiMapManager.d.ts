import { Roi } from './Roi';
import { GetRoisOptions } from './getRois';
export interface RoiManager {
    getRois(options: GetRoisOptions): Roi[];
}
export interface RoiMap {
    /**
     * Width of the map.
     */
    width: number;
    /**
     * Height of the map.
     */
    height: number;
    /**
     * Data of the ROIs. Each ROI is associated with a negative or a positive value,
     * depending if it derives from a zone made of zeros or ones in the original mask.
     */
    data: Int16Array;
    /**
     * Number of distinct positive values in the ROI map
     *
     */
    nbPositive: number;
    /**
     * Number of distinct negative values in the ROI map
     *
     */
    nbNegative: number;
}
export declare class RoiMapManager implements RoiManager {
    private map;
    whiteRois: Roi[];
    blackRois: Roi[];
    constructor(map: RoiMap);
    /**
     *Return the ROI map of the RoiMapManager.
     *
     * @returns - The ROI map.
     */
    getMap(): RoiMap;
    /**
     * Return the value at the given coordinates in an ROI map.
     *
     * @param column - Column of the value.
     * @param row - Row of the value.
     * @returns The value at the given coordinates.
     */
    getMapValue(column: number, row: number): number;
    /**
     * Returns the ROI map as a correct width and height matrix.
     *
     * @returns The ROI map matrix
     */
    getMapMatrix(): number[][];
    getRois(options?: GetRoisOptions): Roi[];
}
//# sourceMappingURL=RoiMapManager.d.ts.map