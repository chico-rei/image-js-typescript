import { Image } from '../Image';
export interface LevelOptions {
    /**
     * Specify which channels should be processed. To process the alpha as well,
     * specify the channels as [0,1,2,3] for RGBA images and [0,1] for GREYA.
     *
     * @default All components of the image the image (no alpha).
     */
    channels?: number[];
    /**
     * Minimal input value.
     *
     * @default 0
     */
    inputMin?: number;
    /**
     * Maximal input value.
     *
     * @default image.maxValue
     */
    inputMax?: number;
    /**
     * Minimal output value.
     *
     * @default 0
     */
    outputMin?: number;
    /**
     * Maximal output value.
     *
     * @default image.maxValue
     */
    outputMax?: number;
    /**
     * Specifies the shape of the curve connecting the two points.
     *
     * @default 1
     */
    gamma?: number;
    /**
     * Image to which to output.
     */
    out?: Image;
}
/**
 * Level the image using the optional input and output value. This function allows you to enhance the image's contrast.
 *
 * @param image - Image to process.
 * @param options - Level options.
 * @returns The levelled image.
 */
export declare function level(image: Image, options?: LevelOptions): Image;
//# sourceMappingURL=level.d.ts.map