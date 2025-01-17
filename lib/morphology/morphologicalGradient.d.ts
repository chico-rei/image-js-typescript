import { Image, Mask } from '..';
export interface MorphologicalGradientOptions {
    /**
     * 3x3 matrix. The kernel can only have ones and zeros.
     * Accessing a value: kernel[row][column]
     *
     * @default [[1, 1, 1], [1, 1, 1], [1, 1, 1]]
     */
    kernel?: number[][];
    /**
     * Number of iterations of the algorithm.
     *
     * @default 1
     */
    iterations?: number;
}
export declare function morphologicalGradient(image: Image, options?: MorphologicalGradientOptions): Image;
export declare function morphologicalGradient(image: Mask, options?: MorphologicalGradientOptions): Mask;
//# sourceMappingURL=morphologicalGradient.d.ts.map