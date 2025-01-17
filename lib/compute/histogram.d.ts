import { Image } from '../Image';
export interface HistogramOptions {
    /**
     * The channel for which to compute the histogram.
     * If it is unspecified, the image must have one channel or the method will
     * throw an error.
     *
     * @default 0
     */
    channel?: number;
}
/**
 * Returns a histogram of pixel intensities.
 *
 * @param image - The original image.
 * @param options - Histogram options.
 * @returns - The histogram.
 */
export declare function histogram(image: Image, options?: HistogramOptions): Uint32Array;
//# sourceMappingURL=histogram.d.ts.map