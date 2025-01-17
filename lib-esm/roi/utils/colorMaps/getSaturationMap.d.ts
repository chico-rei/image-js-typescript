import { RoiKind } from '../../getRois';
export interface GetSaturationMapOptions {
    /**
     * Number of black ROIs
     */
    nbNegative: number;
    /**
     * Number of white ID ROIs
     */
    nbPositive: number;
    /**
     * Specify which ROIs to colour.
     *
     * @default RoiKind.BW
     */
    roiKind?: RoiKind;
    /**
     * Hue of white ROIs
     *
     * @default 0
     */
    whiteHue?: number;
    /**
     * Hue of black ROIs
     *
     * @default 240
     */
    blackHue?: number;
}
/**
 * Return a map where ROIs are different shades of red (positive) or blue (negative) depending on the ROI index. It it the saturation of the HSV color model that is varied.
 *
 * @param options - Get temperature map options
 * @returns The colored map.
 */
export declare function getSaturationMap(options: GetSaturationMapOptions): Uint32Array;
//# sourceMappingURL=getSaturationMap.d.ts.map