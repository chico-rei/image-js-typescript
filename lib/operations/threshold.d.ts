import { Mask } from '..';
import { Image } from '../Image';
export declare enum ThresholdAlgorithm {
    HUANG = "HUANG",
    INTERMODES = "INTERMODES",
    ISODATA = "ISODATA",
    LI = "LI",
    MAX_ENTROPY = "MAX_ENTROPY",
    MEAN = "MEAN",
    MIN_ERROR = "MIN_ERROR",
    MINIMUM = "MINIMUM",
    MOMENTS = "MOMENTS",
    OTSU = "OTSU",
    PERCENTILE = "PERCENTILE",
    RENYI_ENTROPY = "RENYI_ENTROPY",
    SHANBHAG = "SHANBHAG",
    TRIANGLE = "TRIANGLE",
    YEN = "YEN"
}
interface ThresholdOptionsBase {
    /**
     * Image to use as the output.
     */
    out?: Mask;
}
export interface ThresholdOptionsThreshold extends ThresholdOptionsBase {
    /**
     * Threshold value that should be used. Should be an integer between 0 and Image.maxValue or a value in percents as a string, like "40%".
     */
    threshold: number | string;
}
export interface ThresholdOptionsAlgorithm extends ThresholdOptionsBase {
    /**
     * Specify a function to computes the threshold value.
     *
     *   @default ThresholdAlgorithm.OTSU
     */
    algorithm?: ThresholdAlgorithm;
}
export type ThresholdOptions = ThresholdOptionsThreshold | ThresholdOptionsAlgorithm;
/**
 * Compute threshold value for an image using the specified algorithm.
 *
 * @param image - The grey image.
 * @param algorithm - Algorithm that defines the threshold.
 * @returns The threshold value for the image.
 */
export declare function computeThreshold(image: Image, algorithm?: ThresholdAlgorithm): number;
/**
 * Create a black and white image based on a threshold value.
 *
 * @param image - The grey image to convert.
 * @param options - Threshold options.
 * @returns The resulting mask.
 */
export declare function threshold(image: Image, options?: ThresholdOptions): Mask;
export {};
//# sourceMappingURL=threshold.d.ts.map