import { Image, ImageColorModel } from '../Image';
import { Mask } from '../Mask';
export interface ConvertColorOptions {
    /**
     * Image to which to output.
     */
    out?: Image;
}
/**
 * Convert image to a different color model.
 *
 * @param image - Image to convert.
 * @param colorModel - New color model.
 * @param options - Convert color options.
 * @returns The converted image.
 */
export declare function convertColor(image: Image | Mask, colorModel: ImageColorModel, options?: ConvertColorOptions): Image;
/**
 * Copy alpha channel of source to dest.
 *
 * @param source - Source image.
 * @param dest - Destination image.
 */
export declare function copyAlpha(source: Image, dest: Image): void;
/**
 * Convert Mask to GREY.
 *
 * @param mask - Mask to convert.
 * @param newImage - Converted image.
 */
export declare function convertBinaryToGrey(mask: Mask, newImage: Image): void;
//# sourceMappingURL=convertColor.d.ts.map