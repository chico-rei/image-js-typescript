import { Point } from '../../utils/geometry/points';
interface McchOptions {
    /**
     * Whether the input points are already sorted or not (sort by column and then row).
     *
     * @default false
     */
    sorted?: boolean;
}
/**
 * Computes the convex hull of a binary image using Andrew's Monotone Chain Algorithm
 * http://www.algorithmist.com/index.php/Monotone_Chain_Convex_Hull
 *
 * @param points - An array of points.
 * @param options - MCCH Algorithm options.
 * @returns Coordinates of the convex hull in clockwise order.
 */
export declare function monotoneChainConvexHull(points: Point[], options?: McchOptions): Point[];
export {};
//# sourceMappingURL=monotoneChainConvexHull.d.ts.map