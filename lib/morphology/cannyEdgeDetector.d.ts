import { Image, Mask } from '..';
import { GaussianBlurOptions } from '../filters';
export interface CannyEdgeOptions {
    /**
     * Lower threshold of the gaussian blur (indicates the weak edges to discard).
     *
     * @default 0.04
     */
    lowThreshold?: number;
    /**
     * Higher threshold of the gaussian blur (indicates the strong edges to keep). Value must be between 0 and 1.
     *
     * @default 0.1
     */
    highThreshold?: number;
    /**
     * Standard deviation of the gaussian blur (sigma). Value must be between 0 and 1.
     *
     * @default { sigma: 1 }
     */
    gaussianBlurOptions?: GaussianBlurOptions;
    /**
     * Enable/ disable hysteresis steps.
     *
     * @default true
     */
    hysteresis?: boolean;
    /**
     * Image to which the resulting image has to be put.
     */
    out?: Mask;
}
/**
 * Apply Canny edge detection to an image.
 *
 * @param image - Image to process.
 * @param options - Canny edge detection options.
 * @returns The processed image.
 */
export declare function cannyEdgeDetector(image: Image, options?: CannyEdgeOptions): Mask;
/**
 * Return a 0 to 3 value indicating the four main directions (horizontal, upward diagonal, vertical, downward diagonal).
 *
 * @param x - The x coordinate
 * @param y - The y coordinate
 * @returns The direction as a 0 to 4 value.
 */
export declare function getDirection(x: number, y: number): number;
//# sourceMappingURL=cannyEdgeDetector.d.ts.map