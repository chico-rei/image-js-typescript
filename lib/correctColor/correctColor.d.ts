import { RgbColor } from 'colord';
import { Image } from '../Image';
/**
 * Correct the colors in an image using the reference colors.
 * Algorithm is based on the paper "Color correction using improved linear regression algorithm".
 * DOI: 10.1109/ICTS.2015.7379874
 *
 * @param image - Image to process.
 * @param measuredColors - Colors from the image, which will be compared to the reference.
 * @param referenceColors - Reference colors.
 * @returns Image with the colors corrected.
 */
export declare function correctColor(image: Image, measuredColors: RgbColor[], referenceColors: RgbColor[]): Image;
/**
 * Compute the third order variables for the regression from an RGB color.
 *
 * @param r - Red component.
 * @param g - Green component.
 * @param b - Blue component.
 * @param maxValue - Maximal acceptable value for the image to process.
 * @returns The variables for the multivariate linear regression.
 */
export declare function getRegressionVariables(r: number, g: number, b: number, maxValue: number): number[];
//# sourceMappingURL=correctColor.d.ts.map