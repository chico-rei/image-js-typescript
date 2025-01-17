import { RgbColor } from 'colord';
import { Image } from '../../Image';
/**
 * Extract the colors of an image in order to use them for color correction. Should be used on small images only (smaller than 10x10 pixels), because it is these colors that will be used in the model (MLR).
 *
 * @param image - Image from which to get the colors.
 * @returns Array of colors.
 */
export declare function getImageColors(image: Image): RgbColor[];
//# sourceMappingURL=getImageColors.d.ts.map