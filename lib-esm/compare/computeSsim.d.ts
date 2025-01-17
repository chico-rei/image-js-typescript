import { Image } from '..';
export interface SsimOptions {
    /**
     * Window size for SSIM map.
     *
     * @default Math.min(11, image.width, image.height)
     */
    windowSize?: number;
    /**
     * Algorithm to use to compute the SSIM.
     *
     * @default 'original'
     */
    algorithm?: 'fast' | 'original' | 'bezkrovny' | 'weber';
}
export interface Ssim {
    /**
     * Mean SSIM of the whole image. It is the mean value of the SSIM map.
     * It is a similarity score between two images.
     */
    mssim: number;
    /**
     * Similarity map of the two images. The dimensions of the map depend the windowSize option.
     * Create a GREY image based on this map to visualize the similarity of the different regions of the image.
     */
    ssimMap: {
        data: number[];
        width: number;
        height: number;
    };
}
/**
 * Compute the Structural Similarity (SSIM) of two RGBA or two GREY images.
 * "The resultant SSIM index is a decimal value between -1 and 1,
 * where 1 indicates perfect similarity, 0 indicates no similarity,
 * and -1 indicates perfect anti-correlation." -
 * https://en.wikipedia.org/wiki/Structural_similarity
 *
 * @param image - First image.
 * @param otherImage - Second image.
 * @param options - SSIM options.
 * @returns SSIM of the two images.
 */
export declare function computeSsim(image: Image, otherImage: Image, options?: SsimOptions): Ssim;
//# sourceMappingURL=computeSsim.d.ts.map