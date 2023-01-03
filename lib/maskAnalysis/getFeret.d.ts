import { Mask } from '../Mask';
import { Point } from '../geometry';
export interface FeretDiameter {
    /**
     * Start and end point of the Feret diameter.
     */
    points: Point[];
    /**
     * Length of the diameter.
     */
    length: number;
    /**
     * Angle between the diameter and a horizontal line in degrees.
     */
    angle: number;
}
export interface Feret {
    /**
     * Smaller Feret diameter.
     */
    minDiameter: FeretDiameter;
    /**
     * Bigger Feret diameter.
     */
    maxDiameter: FeretDiameter;
    /**
     * Ratio between the smaller and the bigger diameter.
     * Expresses how elongated the shape is. This is a value between 0 and 1.
     */
    aspectRatio: number;
}
/**
 * Computes the Feret diameters
 * https://www.sympatec.com/en/particle-measurement/glossary/particle-shape/#
 * http://portal.s2nano.org:8282/files/TEM_protocol_NANoREG.pdf
 *
 * @param mask - The mask of the ROI.
 * @returns The Feret diameters.
 */
export declare function getFeret(mask: Mask): Feret;
//# sourceMappingURL=getFeret.d.ts.map