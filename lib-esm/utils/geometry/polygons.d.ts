import { Point } from './points';
/**
 * Compute the perimeter of a polygon.
 *
 * @param points - Array of polygon vertices.
 * @returns The perimeter.
 */
export declare function getPolygonPerimeter(points: Point[]): number;
/**
 * Compute the area of a polygon.
 * Based on the algorithm described on
 * https://web.archive.org/web/20100405070507/http://valis.cs.uiuc.edu/~sariel/research/CG/compgeom/msg00831.html
 *
 * @param points - Array of polygon vertices.
 * @returns The area.
 */
export declare function getPolygonArea(points: Point[]): number;
//# sourceMappingURL=polygons.d.ts.map