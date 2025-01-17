import { Image } from '../Image';
import { Point } from '../geometry';
/**
 * Compute the score of a keypoint using the function described in the FAST article.
 * DOI: https://doi.org/10.1007/11744023_34
 *
 * @param image - Image to process
 * @param origin - Keypoint coordinates.
 * @param threshold - FAST threshold.
 * @param circlePoints - Coordinates of the points on the circle.
 * @returns Score of the corner.
 */
export declare function getFastScore(image: Image, origin: Point, threshold: number, circlePoints: Point[]): number;
//# sourceMappingURL=getFastScore.d.ts.map