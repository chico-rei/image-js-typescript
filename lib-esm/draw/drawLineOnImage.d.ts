import { Image } from '../Image';
import { Point } from '../utils/geometry/points';
export interface DrawLineOnImageOptions {
    /**
     * Color of the line. Should be an array of N elements (e.g. R, G, B or G, A), N being the number of channels.
     *
     * @default 'black'
     */
    strokeColor?: number[];
    /**
     * Origin of the line relative to a parent image (top-left corner).
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
 * Draw a line defined by two points onto an image.
 *
 * @param image - Image to process.
 * @param from - Line starting point.
 * @param to - Line ending point.
 * @param options - Draw Line options.
 * @returns The mask with the line drawing.
 */
export declare function drawLineOnImage(image: Image, from: Point, to: Point, options?: DrawLineOnImageOptions): Image;
//# sourceMappingURL=drawLineOnImage.d.ts.map