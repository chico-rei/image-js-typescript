import { ColorDepth, Image } from '..';
import { BorderType } from '../utils/interpolateBorder';
export interface GradientFilterBaseOptions {
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
export interface GradientFilterXOptions extends GradientFilterBaseOptions {
    /**
     * Kernel along x axis.
     */
    kernelX: number[][];
}
export interface GradientFilterYOptions extends GradientFilterBaseOptions {
    /**
     * Kernel along y axis.
     */
    kernelY: number[][];
}
export interface GradientFilterXYOptions extends GradientFilterBaseOptions {
    /**
     * Kernel along x axis.
     */
    kernelX: number[][];
    /**
     * Kernel along y axis.
     */
    kernelY: number[][];
}
export type GradientFilterOptions = GradientFilterXOptions | GradientFilterYOptions | GradientFilterXYOptions;
/**
 * Apply a gradient filter to an image.
 *
 * @param image - The image to process.
 * @param options - Gradient filter options.
 * @returns The gradient image.
 */
export declare function gradientFilter(image: Image, options: GradientFilterOptions): Image;
//# sourceMappingURL=gradientFilter.d.ts.map