import { Image, Mask, Point } from '..';
export interface CopyToOptions<OutType> {
    /**
     * Origin for the crop relative to the top-left corner of the image.
     *
     * @default {row: 0, column: 0}
     */
    origin?: Point;
    /**
     * Image to which to output.
     */
    out?: OutType;
}
export declare function copyTo(source: Image, target: Image, options?: CopyToOptions<Image>): Image;
export declare function copyTo(source: Mask, target: Mask, options?: CopyToOptions<Mask>): Mask;
//# sourceMappingURL=copyTo.d.ts.map