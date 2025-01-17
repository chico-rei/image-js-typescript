import { Mask } from '..';
export interface OrOptions {
    /**
     * Image to which the resulting image has to be put.
     */
    out?: Mask;
}
/**
 * Perform an OR operation on two masks.
 *
 * @param mask - First mask.
 * @param otherMask - Second mask.
 * @param options - Or options.
 * @returns OR of the two masks.
 */
export declare function or(mask: Mask, otherMask: Mask, options?: OrOptions): Mask;
//# sourceMappingURL=or.d.ts.map