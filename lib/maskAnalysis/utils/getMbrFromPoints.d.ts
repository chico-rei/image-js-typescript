import { Point } from '../../utils/geometry/points';
import { Mbr } from '../getMbr';
/**
 * Get the four corners of the minimun bounding rectangle from a set of points defining a simple convex polygon.
 * https://www.researchgate.net/profile/Lennert_Den_Boer2/publication/303783472_A_Fast_Algorithm_for_Generating_a_Minimal_Bounding_Rectangle/links/5751a14108ae6807fafb2aa5.pdf
 *
 * @param points - Points from which to compute the MBR.
 * @returns The array of corners.
 */
export declare function getMbrFromPoints(points: readonly Point[]): Mbr;
//# sourceMappingURL=getMbrFromPoints.d.ts.map