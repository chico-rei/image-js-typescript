import { Point } from '../geometry';
/**
 * Get the coordinates of the points on a circle. The reference is the center of the circle.
 * The first point is the right one and they are then sorted clockwise.
 *
 * @param radius - Radius of the circle.
 * @returns The coordinates of the points on a circle of given diameter.
 */
export declare function getCirclePoints(radius: number): Point[];
/**
 * Get the coordinates of the points that are on right, bottom, left and top at a given radius. The reference is the center of the circle.
 * First point is the most on the right, then points are in clockwise order.
 *
 * @param radius - Radius of the circle.
 * @returns The coordinates of the compass points.
 */
export declare function getCompassPoints(radius: number): Point[];
//# sourceMappingURL=getCirclePoints.d.ts.map