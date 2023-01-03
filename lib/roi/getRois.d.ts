import { Roi } from './Roi';
import { RoiMapManager } from './RoiMapManager';
export declare enum RoiKind {
    BLACK = "BLACK",
    WHITE = "WHITE",
    BW = "BW"
}
export interface GetRoisOptions {
    /**
     * Minimal surface of the ROIs to keep
     *
     * @default 0
     */
    minSurface?: number;
    /**
     * Maximal surface of the ROIs to keep
     *
     * @default Number.MAX_SAFE_INTEGER
     */
    maxSurface?: number;
    /**
     * Kind of ROIs to keep
     *
     * @default RoiKind.WHITE
     */
    kind?: RoiKind;
}
/**
 * Return an array of ROIs matching the options.
 *
 * @param roiMapManager - The ROI map manager containing the ROIs
 * @param options - Get ROIs options.
 * @returns The array of ROIs.
 */
export declare function getRois(roiMapManager: RoiMapManager, options?: GetRoisOptions): Roi[];
//# sourceMappingURL=getRois.d.ts.map