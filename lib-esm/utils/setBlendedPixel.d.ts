import { Image } from '../Image';
import { Mask } from '../Mask';
export interface SetBlendedPixelOptions {
    /**
     * Color with which to blend the image pixel.
     *
     * @default Opaque black.
     */
    color?: number[];
}
/**
 * Blend the given pixel with the pixel at the specified location in the image.
 *
 * @param image - The image with which to blend.
 * @param column - Column of the target pixel.
 * @param row - Row of the target pixel.
 * @param options - Set blended pixel options.
 */
export declare function setBlendedPixel(image: Image | Mask, column: number, row: number, options?: SetBlendedPixelOptions): void;
//# sourceMappingURL=setBlendedPixel.d.ts.map