import { Mask } from '../Mask';
import { Roi } from './Roi';
export interface GetMaskOptions {
    /**
     * Should the inner borders be returned too?
     *
     * @default false
     */
    innerBorders?: boolean;
    /**
     * Consider pixels connected by corners? This option is only useful if filled = false.
     *
     * @default false
     */
    allowCorners?: boolean;
}
/**
 * Generate a mask of an ROI. You can specify the kind of mask you want using the `kind` option.
 *
 * @param roi - The ROI to generate a mask for.
 * @param options - Get mask options.
 * @returns The ROI mask.
 */
export declare function getMask(roi: Roi, options?: GetMaskOptions): Mask;
//# sourceMappingURL=getMask.d.ts.map