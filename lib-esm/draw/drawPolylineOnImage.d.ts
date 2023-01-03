import { Image } from '../Image';
import { Point } from '../utils/geometry/points';
export interface DrawPolylineOnImageOptions {
    /**
     * Line color - array of N elements (e.g. R, G, B or G, A), N being the number of channels.
     *
     * @default black
     */
    strokeColor?: number[];
    /**
     * Origin of the rectangle relative to a parent image (top-left corner).
     *
     * @default {row: 0, column: 0}
     */
    origin?: Point;
    /**
     * Image to which the resulting image has to be put.
     */
    out?: Image;
}
/**
 * Draw a polyline defined by an array of points on an image.
 *
 * @param image - Image to process.
 * @param points - Polyline array of points.
 * @param options - Draw polyline options.
 * @returns The image with the polyline drawing.
 */
export declare function drawPolylineOnImage(image: Image, points: Point[], options?: DrawPolylineOnImageOptions): Image;
//# sourceMappingURL=drawPolylineOnImage.d.ts.map