import { Mask } from '..';
import { Image } from '../Image';
export interface ErodeOptions {
    /**
     * Matrix with odd dimensions (e.g. 1 by 3). The kernel can only have ones and zeros.
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
export declare function erode(image: Image, options?: ErodeOptions): Image;
export declare function erode(image: Mask, options?: ErodeOptions): Mask;
//# sourceMappingURL=erode.d.ts.map