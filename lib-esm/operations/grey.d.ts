import { Image } from '..';
import * as greyAlgorithms from './greyAlgorithms';
export type GreyAlgorithms = keyof typeof greyAlgorithms;
/**
 * Call back that converts the RGB channels to grey. It is clamped afterwards.
 *
 * @callback GreyAlgorithmCallback
 * @param {number} red - value of the red channel
 * @param {number} green - value of the green channel
 * @param {number} blue - value of the blue channel
 * @returns {number} value of the grey channel
 */
export type GreyAlgorithmCallback = (red: number, green: number, blue: number, image: Image) => number;
export interface GreyOptions {
    /**
     * Specify the grey algorithm to use.
     *
     * @default 'luma709'
     */
    algorithm?: GreyAlgorithms | GreyAlgorithmCallback;
    /**
     * Specify wether to keep an alpha channel in the new image or not.
     *
     * @default false
     */
    keepAlpha?: boolean;
    /**
     * Specify wether to merge the alpha channel with the gray pixel or not.
     *
     * @default true
     */
    mergeAlpha?: boolean;
    /**
     * Image to which to output.
     */
    out?: Image;
}
/**
 * Convert the current image to grayscale.
 * The source image has to be RGB or RGBA.
 * If there is an alpha channel you have to specify what to do:
 * - keepAlpha :  keep the alpha channel, you will get a GREYA image
 * - mergeAlpha : multiply each pixel of the image by the alpha, you will get a GREY image
 *
 * @param image - Original color image to convert to grey.
 * @param options - The grey conversion options.
 * @returns The resulting grey image.
 */
export declare function grey(image: Image, options?: GreyOptions): Image;
//# sourceMappingURL=grey.d.ts.map