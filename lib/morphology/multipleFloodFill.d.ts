import { Mask } from '..';
import { BitValue } from '../Mask';
export interface MultipleFloodFillOptions {
    /**
     * Points from which to start the flood fill
     *
     * @default [0]
     */
    startPixels?: Iterable<number>;
    /**
     * Initial value of the start pixel.
     *
     * @default 0
     */
    startPixelValue?: BitValue;
    /**
     *  What value should the relevant pixels be set to?
     *
     * @default 1
     */
    newPixelValue?: BitValue;
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
export declare function multipleFloodFill(mask: Mask, options?: MultipleFloodFillOptions): Mask;
//# sourceMappingURL=multipleFloodFill.d.ts.map