import { Image } from '../Image';
import { Point } from '../geometry';
export interface GetHarrisScoreOptions {
    /**
     * Size of the window to compute the Harris score.
     * Should be an odd number so that the window can be centered on the corner.
     *
     * @default 7
     */
    windowSize?: number;
    /**
     * Constant for the score computation. Should be between 0.04 and 0.06 (empirical values).
     *
     * @default 0.04
     */
    harrisConstant?: number;
}
/**
 * Get the Harris score of a corner. The idea behind the algorithm is that a
 * slight shift of a window around a corner along x and y shoud result in
 * a very different image.
 * https://en.wikipedia.org/wiki/Harris_corner_detector#:~:text=The%20Harris%20corner%20detector%20is,improvement%20of%20Moravec's%20corner%20detector.
 *
 * We distinguish 3 cases:
 * - the score is highly negative: you have an edge
 * - the abolute value of the score is small: the region is flat
 * - the score is highly positive: you have a corner
 *
 * @param image - Image to which the corner belongs. It must be a greyscale image with only one channel.
 * @param origin - Center of the window, where the corner should be.
 * @param options - Get Harris score options.
 * @returns The Harris score.
 */
export declare function getHarrisScore(image: Image, origin: Point, options?: GetHarrisScoreOptions): number;
//# sourceMappingURL=getHarrisScore.d.ts.map