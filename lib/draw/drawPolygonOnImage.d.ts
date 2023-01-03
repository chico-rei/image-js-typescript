import { Image } from '../Image';
import { Point } from '../utils/geometry/points';
import { DrawPolylineOnImageOptions } from './drawPolylineOnImage';
export interface DrawPolygonOnImageOptions extends DrawPolylineOnImageOptions {
    /**
     * Fill color - array of N elements (e.g. R, G, B or G, A), N being the number of channels.
     *
     * @default 'black'
     */
    fillColor?: number[];
    /**
     * Origin of the rectangle relative to a parent image (top-left corner).
     *
     * @default {row: 0, column: 0}
     */
    origin?: Point;
}
/**
 * Draw a polygon defined by an array of points onto an image.
 *
 * @param image - Image to process.
 * @param points - Polygon vertices.
 * @param options - Draw Line options.
 * @returns The image with the polygon drawing.
 */
export declare function drawPolygonOnImage(image: Image, points: Point[], options?: DrawPolygonOnImageOptions): Image;
//# sourceMappingURL=drawPolygonOnImage.d.ts.map