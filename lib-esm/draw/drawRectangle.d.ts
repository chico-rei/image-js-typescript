import { Image } from '../Image';
import { Mask } from '../Mask';
import { Point } from '../utils/geometry/points';
export interface DrawRectangleOptions<OutType> {
    /**
     * Origin of the rectangle relative to a parent image (top-left corner).
     *
     * @default {row: 0, column: 0}
     */
    origin?: Point;
    /**
     * Specify the width of the rectangle.
     *
     * @default image.width
     */
    width?: number;
    /**
     * Specify the width of the rectangle
     *
     * @default image.height
     */
    height?: number;
    /**
     * Color of the rectangle's border. Should be an array of N elements (e.g. R, G, B or G, A), N being the number of channels.
     *
     * @default black
     */
    strokeColor?: number[] | 'none';
    /**
     * Rectangle fill color array of N elements (e.g. R, G, B or G, A), N being the number of channels.
     *
     */
    fillColor?: number[];
    /**
     * Image to which the resulting image has to be put.
     */
    out?: OutType;
}
export declare function drawRectangle(image: Image, options?: DrawRectangleOptions<Image>): Image;
export declare function drawRectangle(image: Mask, options?: DrawRectangleOptions<Mask>): Mask;
//# sourceMappingURL=drawRectangle.d.ts.map