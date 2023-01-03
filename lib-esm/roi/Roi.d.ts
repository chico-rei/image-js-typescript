import { Mask } from '../Mask';
import { GetBorderPointsOptions } from '../maskAnalysis';
import { Point } from '../utils/geometry/points';
import { RoiMap } from './RoiMapManager';
import { GetMaskOptions } from './getMask';
export declare class Roi {
    /**
     * Original map with all the ROI IDs.
     */
    private readonly map;
    /**
     * ID of the ROI. Positive for white ROIs and negative for black ones.
     */
    id: number;
    /**
     * Origin of the ROI. The top-left corner of the rectangle around
     * the ROI relative to the original image.
     */
    origin: Point;
    /**
     * Width of the ROI.
     */
    width: number;
    /**
     * Height of the ROI.
     */
    height: number;
    /**
     * Surface of the ROI.
     */
    surface: number;
    constructor(map: RoiMap, id: number);
    /**
     * Get the ROI map of the original image.
     *
     * @returns The ROI map.
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
     * Return the ratio between the width and the height of the bounding rectangle of the ROI.
     *
     * @returns The width by height ratio.
     */
    getRatio(): number;
    /**
     * Generate a mask of an ROI. You can specify the kind of mask you want using the `kind` option.
     *
     * @param options - Get Mask options
     * @returns The ROI mask.
     */
    getMask(options?: GetMaskOptions): Mask;
    /**
     * Return an array with the coordinates of the pixels that are on the border of the ROI.
     * The points are defined as [column, row].
     *
     * @param options - Get border points options.
     * @returns The array of border pixels.
     */
    getBorderPoints(options?: GetBorderPointsOptions): Array<Point>;
}
//# sourceMappingURL=Roi.d.ts.map