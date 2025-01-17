import { Mask } from '..';
export interface AndOptions {
    /**
     * Image to which the resulting image has to be put.
     */
    out?: Mask;
}
/**
 * Perform an AND operation on two masks.
 *
 * @param mask - First mask.
 * @param otherMask - Second mask.
 * @param options - And options.
 * @returns AND of the two masks.
 */
export declare function and(mask: Mask, otherMask: Mask, options?: AndOptions): Mask;
//# sourceMappingURL=and.d.ts.map