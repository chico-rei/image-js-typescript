import { Point } from '../../utils/geometry/points';
/**
 * The angle in radians of a vector relatively to the x axis.
 * The angle is positive in the cloxkwise direction.
 * This is an optimized version because it assumes that one of
 * the points is on the line y = 0.
 *
 * @param p1 - First point.
 * @param p2 - Second point.
 * @returns Rotation angle in radians to make the line horizontal.
 */
export declare function getAngle(p1: Point, p2: Point): number;
//# sourceMappingURL=getAngle.d.ts.map