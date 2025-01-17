import { Point } from './points';
/**
 * Convert radians to degrees
 *
 * @param radians - Angle in radians.
 * @returns  Angle in degrees.
 */
export declare function toDegrees(radians: number): number;
/**
 * Returns the angle between 3 points. The first one is the point where the angle is.
 *
 * @param origin - Origin where the angle has to be measured.
 * @param p1 - First point.
 * @param p2 - Second point.
 * @returns The angle in radians.
 */
export declare function angle(origin: Point, p1: Point, p2: Point): number;
//# sourceMappingURL=angles.d.ts.map