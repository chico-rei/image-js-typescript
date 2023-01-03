import { Mask } from '..';
export interface ClearBorderOptions {
    /**
     * Consider pixels connected by corners?
     *
     * @default false
     */
    allowCorners?: boolean;
    /**
     * Image to which the resulting image has to be put.
     */
    out?: Mask;
}
/**
 * Set the pixels connected to the border of the mask to zero. You can chose to allow corner connection of not with the `allowCorners` option.
 *
 * @param mask - The mask to process.
 * @param options - Clear border options.
 * @returns The image with cleared borders.
 */
export declare function clearBorder(mask: Mask, options?: ClearBorderOptions): Mask;
//# sourceMappingURL=clearBorder.d.ts.map