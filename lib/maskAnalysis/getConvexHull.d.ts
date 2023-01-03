import { Mask } from '../Mask';
import { Point } from '../utils/geometry/points';
/**
 * Convex Hull polygon of a mask.
 */
export interface ConvexHull {
    /**
     * Vertices of the convex Hull in clockwise order.
     */
    points: Point[];
    /**
     * Perimeter of the convex Hull.
     */
    perimeter: number;
    /**
     * Surface of the convex Hull.
     */
    surface: number;
}
/**
 * Get the vertices of the convex Hull polygon of a mask.
 *
 * @param mask - Mask to process.
 * @returns Array of the vertices of the convex Hull in clockwise order.
 */
export declare function getConvexHull(mask: Mask): ConvexHull;
//# sourceMappingURL=getConvexHull.d.ts.map