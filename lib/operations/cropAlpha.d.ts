import { Image } from '../Image';
export interface CropAlphaOptions {
    /**
     * Threshold from which rows and columns should be kept.
     */
    threshold?: number;
}
/**
 * Crops the image based on the alpha channel
 * This removes lines and columns where the alpha channel is lower than a threshold value.
 *
 * @param image - Image to process.
 * @param options - Crop alpha options.
 * @returns The cropped image.
 */
export declare function cropAlpha(image: Image, options?: CropAlphaOptions): Image;
//# sourceMappingURL=cropAlpha.d.ts.map