import { RoisColorMode } from '../colorRois';
import { RoiKind } from '../getRois';
export interface GetColorMapOptions {
    /**
     * Number of black ROIs
     */
    nbNegative: number;
    /**
     * Number of white ID ROIs
     */
    nbPositive: number;
    /**
     * Specify the mode: what colors to use in the color map
     *
     * @default ColorMode.BINARY
     */
    mode?: RoisColorMode;
    /**
     * Specify which ROIs to colour.
     *
     * @default RoiKind.BW
     */
    roiKind?: RoiKind;
}
/**
 * Return a map of 32 bits integers corresponding to the colors of each ROI.
 *
 * @param options - Get color map options.
 * @returns The color map.
 */
export declare function getColorMap(options: GetColorMapOptions): Uint32Array;
//# sourceMappingURL=getColorMap.d.ts.map