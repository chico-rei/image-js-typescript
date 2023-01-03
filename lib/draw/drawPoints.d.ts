import { Image } from '../Image';
import { Mask } from '../Mask';
import { Point } from '../utils/geometry/points';
export interface DrawPointsOptions {
    /**
     * Color of the points. Should be an array of N elements (e.g. R, G, B or G, A), N being the number of channels.
     *
     * @default 'black'
     */
    color?: number[];
    /**
     * Origin of the points relative to a parent image (top-left corner).
     *
     * @default {row: 0, column: 0}
     */
    origin?: Point;
    /**
     * Image to which the resulting image has to be put.
     */
    out?: Image;
}
export declare function drawPoints(image: Image, points: Point[], options?: DrawPointsOptions): Image;
export declare function drawPoints(image: Mask, points: Point[], options?: DrawPointsOptions): Mask;
//# sourceMappingURL=drawPoints.d.ts.map