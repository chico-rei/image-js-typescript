import { Image } from '..';
/**
 * Converts R, G and B values to a single value using Luma 709 standard({@link https://en.wikipedia.org/wiki/Luma_(video)}).
 *
 * @param red - Red value of current pixel.
 * @param green - Green value of current pixel.
 * @param blue - Blue value of current pixel.
 * @returns - Corresponding gray value.
 */
export declare function luma709(red: number, green: number, blue: number): number;
/**
 *  Converts R, G and B values to a single value using Luma 601 standard({@link https://en.wikipedia.org/wiki/Luma_(video)}).
 *
 * @param red - Red value of current pixel.
 * @param green - Green value of current pixel.
 * @param blue - Blue value of current pixel.
 * @returns - Corresponding gray value.
 */
export declare function luma601(red: number, green: number, blue: number): number;
/**
 * Return the maximal value between red, green and blue.
 *
 * @param red - Red value of current pixel.
 * @param green - Green value of current pixel.
 * @param blue - Blue value of current pixel.
 * @returns - Corresponding gray value.
 */
export declare function max(red: number, green: number, blue: number): number;
/**
 * Return the minimal value between red, green and blue.
 *
 * @param red - Red value of current pixel.
 * @param green - Green value of current pixel.
 * @param blue - Blue value of current pixel.
 * @returns - Corresponding gray value.
 */
export declare function min(red: number, green: number, blue: number): number;
/**
 * Return the average of red, green and blue.
 *
 * @param red - Red value of current pixel.
 * @param green - Green value of current pixel.
 * @param blue - Blue value of current pixel.
 * @returns - Corresponding gray value.
 */
export declare function average(red: number, green: number, blue: number): number;
/**
 * Return the average between the max and min values of red, green and blue.
 *
 * @param red - Red value of current pixel.
 * @param green - Green value of current pixel.
 * @param blue - Blue value of current pixel.
 * @returns - Corresponding gray value.
 */
export declare function minmax(red: number, green: number, blue: number): number;
/**
 * Return the red value.
 *
 * @param red - Red value of current pixel.
 * @returns - Corresponding gray value.
 */
export declare function red(red: number): number;
/**
 * Return the green value.
 *
 * @param red - Red value of current pixel.
 * @param green - Green value of current pixel.
 * @returns - Corresponding gray value.
 */
export declare function green(red: number, green: number): number;
/**
 * Return the blue value.
 *
 * @param red - Red value of current pixel.
 * @param green - Green value of current pixel.
 * @param blue - Blue value of current pixel.
 * @returns - Corresponding gray value.
 */
export declare function blue(red: number, green: number, blue: number): number;
/**
 * Return the minimum of the inverses of red, green and blue.
 *
 * @param red - Red value of current pixel.
 * @param green - Green value of current pixel.
 * @param blue - Blue value of current pixel.
 * @param image - Image to convert to grey.
 * @returns - Corresponding gray value.
 */
export declare function black(red: number, green: number, blue: number, image: Image): number;
/**
 * Returns the cyan component of a pixel.
 *
 * @param red - Red value of current pixel.
 * @param green - Green value of current pixel.
 * @param blue - Blue value of current pixel.
 * @param image - Image to convert to grey.
 * @returns - Corresponding gray value.
 */
export declare function cyan(red: number, green: number, blue: number, image: Image): number;
/**
 * Returns the magenta component of a pixel.
 *
 * @param red - Red value of current pixel
 * @param green - Green value of current pixel
 * @param blue - Blue value of current pixel
 * @param image - Image to convert to grey.
 * @returns - Corresponding gray value.
 */
export declare function magenta(red: number, green: number, blue: number, image: Image): number;
/**
 * Returns the yellow component of a pixel.
 *
 * @param red - Red value of current pixel
 * @param green - Green value of current pixel
 * @param blue - Blue value of current pixel
 * @param image - Image to convert to grey.
 * @returns - Corresponding gray value.
 */
export declare function yellow(red: number, green: number, blue: number, image: Image): number;
/**
 * Returns the hue of a pixel as a value between 0 and 255.
 *
 * @param red - Red value of current pixel
 * @param green - Green value of current pixel
 * @param blue - Blue value of current pixel
 * @param image - Source image for the RGB values.
 * @returns - Hue of the pixel.
 */
export declare function hue(red: number, green: number, blue: number, image: Image): number;
/**
 * Returns the saturation component of a pixel.
 *
 * @param red - Red value of current pixel
 * @param green - Green value of current pixel
 * @param blue - Blue value of current pixel
 * @param image - Source image for the RGB values.
 * @returns - Saturation of the pixel.
 */
export declare function saturation(red: number, green: number, blue: number, image: Image): number;
/**
 * Returns the lightness of a pixel.
 *
 * @param red - Red value of current pixel
 * @param green - Green value of current pixel
 * @param blue - Blue value of current pixel
 * @returns - Lightness of the pixel
 */
export declare function lightness(red: number, green: number, blue: number): number;
//# sourceMappingURL=greyAlgorithms.d.ts.map