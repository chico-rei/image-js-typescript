import { RgbColor } from 'colord';
import { ColorCard } from '../__tests__/testUtils/referenceColorCard';
/**
 * Reference QP card data formatted to be easier to use for the multivariate linear regression.
 */
export interface ReferenceDataForMlr {
    r: number[][];
    g: number[][];
    b: number[][];
}
/**
 * Convert RGB array colors to RGB object colors. Used to get the properly formatted measured colors.
 *
 * @param arrayColors - Array of RGB colors as 3 elements array.
 * @returns Array of RGB objects.
 */
export declare function getMeasuredColors(arrayColors: number[][]): RgbColor[];
/**
 * Extract the colors from a QP card and convert them to RGB.
 *
 * @param qpCard - QP card containing the color reference values in L*a*b*.
 * @returns Array of reference RGB colors.
 */
export declare function getReferenceColors(qpCard: ColorCard): RgbColor[];
/**
 * Format and normalize data from a QP card to use as a reference in a multivariate linear regression.
 *
 * @param referenceColors - Array of RGB colors used as a reference.
 * @param maxValue - Maximal acceptable value for the image to process.
 * @returns The formatted data.
 */
export declare function formatReferenceForMlr(referenceColors: RgbColor[], maxValue: number): ReferenceDataForMlr;
/**
 * Compute the variables for the multivariate linear regression based on the the input colors. Values are normalized between 0 and 1.
 *
 * @param inputColors - The input colors as an array of rgb objects.
 * @param maxValue - Maximal acceptable value for the image to process.
 * @returns The formatted input data for the regression.
 */
export declare function formatInputForMlr(inputColors: RgbColor[], maxValue: number): number[][];
//# sourceMappingURL=formatData.d.ts.map