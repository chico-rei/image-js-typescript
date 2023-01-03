import { Image } from '../Image';
import { Point } from '../geometry';
import { GetHarrisScoreOptions } from './getHarrisScore';
import { IsFastKeypointOptions } from './isFastKeypoint';
export interface GetFastKeypointsOptions extends IsFastKeypointOptions {
    /**
     * Maximum number of features to return.
     *
     * @default 500
     */
    maxNbFeatures?: number;
    /**
     * Should non-max suppression be applied to the keypoints?
     * This removes all keypoints which
     * don't have the highest value within the adjacent keypoints.
     *
     * @default true
     */
    nonMaxSuppression?: boolean;
    /**
     * Radius of the circle used for the algorithm.
     *
     * @default 3
     */
    fastRadius?: number;
    /**
     * Algorithm to use to compute corners score.
     *
     * @default 'FAST'
     */
    scoreAlgorithm?: 'HARRIS' | 'FAST';
    /**
     * Options for the Harris score computation.
     */
    harrisScoreOptions?: GetHarrisScoreOptions;
    /**
     * Should the keypoint scores be normalized between 0 (worst corner) and 1 (best corner).
     * This feature is only useful if you want to verify the keypoints scores.
     *
     * @default false
     */
    normalizeScores?: boolean;
}
export interface FastKeypoint {
    /**
     * Location of the keypoint in the image.
     */
    origin: Point;
    /**
     * Score of the keypoint, the bigger it is, the better the feature.
     * It is the criteria used for the non-maximal suppression.
     */
    score: number;
}
/**
 * Find the features in a GREY image according to the FAST (Features from Accelerated Segment Test) algorithm.
 * Based on the paper Machine Learning for High-Speed Corner Detection.
 * DOI: https://doi.org/10.1007/11744023_34
 *
 * @param image - The image to process.
 * @param options - Get FAST keypoints options.
 * @returns The FAST keypoints.
 */
export declare function getFastKeypoints(image: Image, options?: GetFastKeypointsOptions): FastKeypoint[];
//# sourceMappingURL=getFastKeypoints.d.ts.map