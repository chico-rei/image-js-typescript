import { Mask } from '..';
import { RoiMapManager } from './RoiMapManager';
export interface FromMaskOptions {
    /**
     * Consider pixels connected by corners as same ROI?
     *
     * @default false
     */
    allowCorners?: boolean;
}
/**
 * Extract the ROIs of an image.
 *
 * @param mask - Mask to extract the ROIs from.
 * @param options - From mask options.
 * @returns The corresponding ROI manager.
 */
export declare function fromMask(mask: Mask, options?: FromMaskOptions): RoiMapManager;
//# sourceMappingURL=fromMask.d.ts.map