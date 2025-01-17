import { Image, Mask } from '..';
export interface TopHatOptions {
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
export declare function topHat(image: Image, options?: TopHatOptions): Image;
export declare function topHat(image: Mask, options?: TopHatOptions): Mask;
//# sourceMappingURL=topHat.d.ts.map