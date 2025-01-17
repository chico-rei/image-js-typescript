import { Mask } from '..';
export interface SolidFillOptions {
    /**
     * Consider pixels connected by corners?
     *
     * @default false
     */
    allowCorners?: boolean;
    /**
     * Image to which the inverted image has to be put.
     */
    out?: Mask;
}
/**
 * Fill holes in regions of interest.
 *
 * @param mask - Mask to process.
 * @param options - Flood fill options.
 * @returns The filled mask.
 */
export declare function solidFill(mask: Mask, options?: SolidFillOptions): Mask;
//# sourceMappingURL=solidFill.d.ts.map