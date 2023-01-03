import { Mask } from '..';
import { Image } from '../Image';
export interface InvertOptions {
    /**
     * Image to which the inverted image has to be put.
     */
    out?: Image | Mask;
}
export declare function invert(image: Image, options?: InvertOptions): Image;
export declare function invert(image: Mask, options?: InvertOptions): Mask;
//# sourceMappingURL=invert.d.ts.map