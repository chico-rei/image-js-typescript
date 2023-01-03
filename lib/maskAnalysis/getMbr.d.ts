import { Mask } from '../Mask';
import { Point } from '../utils/geometry/points';
/**
 * Minimum bounding rectangle of a mask.
 */
export interface Mbr {
    /**
     * Vertices of the MBR in clockwise order.
     */
    corners: Point[];
    /**
     * Perimeter of the MBR.
     */
    perimeter: number;
    /**
     * Surface of the MBR.
     */
    surface: number;
    /**
     * Width of the rectangle.
     */
    width: number;
    /**
     * Height of the rectangle.
     */
    height: number;
    /**
     * Angle between the rectangle and a horizontal line in radians.
     */
    angle: number;
}
/**
 * Get the four corners of the minimun bounding rectangle of an ROI.
 *
 * @param mask - The ROI to process.
 * @returns The array of corners.
 */
export declare function getMbr(mask: Mask): Mbr;
//# sourceMappingURL=getMbr.d.ts.map