import { Point } from './points';
export interface Line {
    /**
     * Line slope.
     */
    a: number;
    /**
     * Line y-intercept.
     */
    b: number;
    /**
     * Line is vertical.
     */
    vertical: boolean;
}
/**
 * Compute the length of a segment defined by two points.
 *
 * @param p1 - First point.
 * @param p2 - Second point.
 * @returns Length of the segment.
 */
export declare function getLineLength(p1: Point, p2: Point): number;
//# sourceMappingURL=lines.d.ts.map