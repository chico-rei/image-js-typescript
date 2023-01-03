import { Image } from '../Image';
import { Point } from '../utils/geometry/points';
export interface DrawCircleOnImageOptions {
    /**
     * Circle border color array of N elements (e.g. R, G, B or G, A), N being the number of channels.
     *
     * @default black
     */
    color?: number[];
    /**
     * Circle fill color array of N elements (e.g. R, G, B or G, A), N being the number of channels.
     *
     */
    fill?: number[];
    /**
     * Image to which the resulting image has to be put.
     */
    out?: Image;
}
/**
 *
 * Draw a circle defined by center and radius.
 *
 * @param image - Image to process.
 * @param center - Circle center point.
 * @param radius - Circle radius.
 * @param options - Draw circle options.
 * @returns The original drawn image
 */
export declare function drawCircleOnImage(image: Image, center: Point, radius: number, options?: DrawCircleOnImageOptions): Image;
//# sourceMappingURL=drawCircleOnImage.d.ts.map