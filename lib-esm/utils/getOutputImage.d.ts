import { CreateFromOptions, Image } from '../Image';
import { Mask } from '../Mask';
export interface OutOptions {
    /**
     * Image to use as the output.
     * The image must have compatible properties or the method will throw.
     */
    out?: Image | Mask;
}
type NewImageParameters = Omit<CreateFromOptions, 'data'>;
interface OutInternalOptions {
    /**
     * Parameters that will be combined with the ones from
     * `thisImage`.
     */
    newParameters?: NewImageParameters;
    /**
     * Specify if the values of the original image should be cloned.
     */
    clone?: boolean;
}
/**
 * Use this function to support getting the output image of an algorithm from
 * user-supplied options.
 *
 * @param thisImage - Current image on which the algorithm is applied.
 * @param options - Options object received by the algorithm.
 * @param internalOptions - Some additional private options.
 * @returns The output image.
 */
export declare function getOutputImage(thisImage: Image, options?: OutOptions, internalOptions?: OutInternalOptions): Image;
/**
 * Use this function to support getting the output image of an algorithm from
 * user-supplied options when the input is a mask.
 *
 * @param mask - Current mask on which the algorithm is applied.
 * @param options - Options object received by the algorithm.
 * @returns The output image.
 */
export declare function maskToOutputImage(mask: Mask, options?: OutOptions): Image;
/**
 * Use this function to support getting the output mask of an algorithm from
 * user-supplied options when the input is an image.
 *
 * @param image - Current image on which the algorithm is applied.
 * @param options - Options object received by the algorithm.
 * @returns The output mask.
 */
export declare function imageToOutputMask(image: Image, options?: OutOptions): Mask;
/**
 * Use this function to support getting the output mask of an algorithm from
 * user-supplied options when the input is an mask.
 *
 * @param mask - Current mask on which the algorithm is applied.
 * @param options - Options object received by the algorithm.
 * @param internalOptions - Additional private options.
 * @returns The output mask.
 */
export declare function maskToOutputMask(mask: Mask, options?: OutOptions, internalOptions?: OutInternalOptions): Mask;
export {};
//# sourceMappingURL=getOutputImage.d.ts.map