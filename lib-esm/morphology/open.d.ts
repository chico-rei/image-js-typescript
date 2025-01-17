import { Image, Mask } from '..';
export interface OpenOptions {
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
export declare function open(image: Image, options?: OpenOptions): Image;
export declare function open(image: Mask, options?: OpenOptions): Mask;
//# sourceMappingURL=open.d.ts.map