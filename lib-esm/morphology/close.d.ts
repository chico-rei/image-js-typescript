import { Image, Mask } from '..';
export interface CloseOptions {
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
export declare function close(image: Image, options?: CloseOptions): Image;
export declare function close(image: Mask, options?: CloseOptions): Mask;
//# sourceMappingURL=close.d.ts.map