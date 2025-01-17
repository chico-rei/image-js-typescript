import { Image, Mask } from '..';
export interface BottomHatOptions {
    /**
     * 3x3 matrix. The kernel can only have ones and zeros.
     * Accessing a value: kernel[row][column].
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
export declare function bottomHat(image: Image, options?: BottomHatOptions): Image;
export declare function bottomHat(image: Mask, options?: BottomHatOptions): Mask;
//# sourceMappingURL=bottomHat.d.ts.map