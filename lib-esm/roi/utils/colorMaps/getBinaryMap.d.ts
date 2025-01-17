import { RoiKind } from '../../getRois';
export interface GetBinaryMapOptions {
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
     * @default 120
     */
    whiteHue?: number;
    /**
     * Hue of black ROIs
     *
     * @default 0
     */
    blackHue?: number;
}
/**
 * Return a map where ROIs are red (negative) or green (positive) depending on the ROI index.
 *
 * @param options - Color maps options.
 * @returns The colored map.
 */
export declare function getBinaryMap(options: GetBinaryMapOptions): Uint32Array;
//# sourceMappingURL=getBinaryMap.d.ts.map