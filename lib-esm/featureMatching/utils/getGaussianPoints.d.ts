import { Point } from '../../geometry';
export interface GetGaussianPointsOptions {
    /**
     * Number of points to generate.
     *
     * @default 1024
     */
    nbPoints?: number;
    /**
     * Seed of the gaussian distribution for the x coordinates.
     *
     * @default 0
     */
    xSeed?: number;
    /**
     * Seed of the gaussian distribution for the y coordinates.
     *
     * @default 1
     */
    ySeed?: number;
    /**
     * The standard deviation for the gaussian distribution.
     */
    sigma?: number;
}
/**
 * Get the coordinates of random points inside of the given dimensions, spread with a
 * gaussian distribution around the center of the dimensions.
 * The reference point with coordinates (0,0) is the center of the patch.
 *
 * @param width - Width in which the points should be.
 * @param height - Height in which the points should be.
 * @param options - Get gaussian points options.
 * @returns An array of random points with a gaussian distribution.
 */
export declare function getGaussianPoints(width: number, height: number, options?: GetGaussianPointsOptions): Point[];
/**
 * Generate an array of values
 * that follow a gaussian distribution with a mean value of zero.
 *
 * @param size - Specifies the width of the gaussian distribution.
 * @param seed - Seed for the random generator.
 * @param nbValues - Number of values wanted.
 * @param sigma - The standard deviation. The default value is the optimal SD for BRIEF.
 * @returns Array of values with gaussian distribution.
 */
export declare function getGaussianValues(size: number, seed: number, nbValues: number, sigma?: number): Float64Array;
//# sourceMappingURL=getGaussianPoints.d.ts.map