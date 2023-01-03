import { ColorDepth, Image } from '..';
import { BorderType } from '../utils/interpolateBorder';
export declare enum DerivativeFilters {
    SOBEL = "SOBEL",
    SCHARR = "SCHARR",
    PREWITT = "PREWITT"
}
export interface DerivativeFilterOptions {
    /**
     * Algorithm to use for the derivative filter.
     *
     * @default SOBEL
     */
    filter?: DerivativeFilters;
    /**
     * Specify how the borders should be handled.
     *
     * @default BorderType.REPLICATE
     */
    borderType?: BorderType;
    /**
     * Value of the border if BorderType is CONSTANT.
     *
     * @default 0
     */
    borderValue?: number;
    /**
     * Specify the bitDepth of the resulting image.
     *
     * @default image.bitDepth
     */
    bitDepth?: ColorDepth;
}
/**
 * Apply a derivative filter to an image.
 *
 * @param image - Image to process.
 * @param options - Derivative filter options.
 * @returns The processed image.
 */
export declare function derivativeFilter(image: Image, options?: DerivativeFilterOptions): Image;
//# sourceMappingURL=derivativeFilter.d.ts.map