import { Image } from '../Image';
import { ClampFunction } from '../utils/clamp';
import { BorderType, BorderInterpolationFunction } from '../utils/interpolateBorder';
export interface ConvolutionOptions {
    /**
     * Specify how the borders should be handled.
     *
     * @default BorderType.REFLECT_101
     */
    borderType?: BorderType;
    /**
     * Value of the border if BorderType is CONSTANT.
     *
     * @default 0
     */
    borderValue?: number;
    /**
     * Should the kernel be normalized?
     *
     * @default false
     */
    normalize?: boolean;
    /**
     * Image to which to output.
     */
    out?: Image;
}
/**
 * Apply a direct convolution on an image using the specified kernel. The convolution corresponds of a weighted average of the surrounding pixels, the weights being defined in the kernel.
 *
 * @param image - The image to process.
 * @param kernel - Kernel to use for the convolution. Should be a 2D matrix with odd number of rows and columns.
 * @param options - Convolution options.
 * @returns The convoluted image.
 */
export declare function directConvolution(image: Image, kernel: number[][], options?: ConvolutionOptions): Image;
/**
 * Compute direct convolution of an image and return an array with the raw values.
 *
 * @param image - Image to process.
 * @param kernel - 2D kernel used for the convolution.
 * @param options - Convolution options.
 * @returns Array with the raw convoluted values.
 */
export declare function rawDirectConvolution(image: Image, kernel: number[][], options?: ConvolutionOptions): Float64Array;
/**
 * Compute the separable convolution of an image.
 *
 * @param image - Image to convolute.
 * @param kernelX - Kernel along x axis.
 * @param kernelY - Kernel along y axis.
 * @param options - Convolution options.
 * @returns The convoluted image.
 */
export declare function separableConvolution(image: Image, kernelX: number[], kernelY: number[], options?: ConvolutionOptions): Image;
export interface ComputeConvolutionValueOptions {
    /**
     * Specify wether the return value should not be clamped and rounded.
     */
    returnRawValue?: boolean;
    /**
     * If the value has to be clamped, specify the clamping function.
     */
    clamp?: ClampFunction;
}
/**
 * Compute the convolution of a value of a pixel in an image.
 *
 * @param column - Column of the pixel.
 * @param row - Row of the pixel.
 * @param channel - Channel to process.
 * @param image - Image to process.
 * @param kernel - Kernel for the convolutions.
 * @param interpolateBorder - Function to interpolate the border pixels.
 * @param options - Compute convolution value options.
 * @returns The convoluted value.
 */
export declare function computeConvolutionValue(column: number, row: number, channel: number, image: Image, kernel: number[][], interpolateBorder: BorderInterpolationFunction, options?: ComputeConvolutionValueOptions): number;
//# sourceMappingURL=convolution.d.ts.map