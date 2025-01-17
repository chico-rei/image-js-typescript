import { Image, Mask } from '..';
export interface SubtractImageOptions {
    /**
     * Return the absolute difference for each pixel.
     *
     * @default false
     */
    absolute?: boolean;
}
export declare function subtract(image: Image, otherImage: Image, options?: SubtractImageOptions): Image;
export declare function subtract(image: Mask, otherImage: Mask, options?: SubtractImageOptions): Mask;
export declare function subtract(image: Image | Mask, otherImage: Image | Mask, options: SubtractImageOptions): Image | Mask;
//# sourceMappingURL=subtract.d.ts.map