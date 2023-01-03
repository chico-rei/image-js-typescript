import { Image } from '../Image';
import { BorderType } from '../utils/interpolateBorder';
interface GaussianBlurBaseOptions {
    /**
     * Specify how the borders should be handled.
     *
     * @default BorderType.REFLECT_101
     */
    borderType?: BorderType;
    /**
     * Image to which the resulting image has to be put.
     */
    out?: Image;
}
export interface GaussianBlurSigmaOptions extends GaussianBlurBaseOptions {
    /**
     * The standard deviation. Specifies the width of the gaussian function in the case where it is the same for x and y.
     */
    sigma: number;
    /**
     * Size of the kernel.
     *
     * @default 2 * Math.ceil(2 * sigma) + 1
     */
    size?: number;
}
export interface GaussianBlurXYOptions extends GaussianBlurBaseOptions {
    /**
     * The standard deviation for the x axis. Specifies the width of the gaussian function along x.
     */
    sigmaX: number;
    /**
     * The standard deviation for the y axis. Specifies the width of the gaussian function along y.
     */
    sigmaY: number;
    /**
     * Size of the X axis kernel
     *
     * @default 2 * Math.ceil(2 * sigmaX) + 1
     */
    sizeX?: number;
    /**
     * Size of the Y axis kernel
     *
     * @default 2 * Math.ceil(2 * sigmaY) + 1
     */
    sizeY?: number;
}
export type GaussianBlurOptions = GaussianBlurSigmaOptions | GaussianBlurXYOptions;
/**
 * Apply a gaussian filter to an image.
 *
 * @param image - Image to blur.
 * @param options - Gaussian blur options.
 * @returns The blurred image.
 */
export declare function gaussianBlur(image: Image, options: GaussianBlurOptions): Image;
export {};
//# sourceMappingURL=gaussianBlur.d.ts.map