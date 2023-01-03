import { ColorDepth, Image, ImageColorModel, Mask } from '..';
interface CheckOptions {
    bitDepth?: ColorDepth[] | ColorDepth;
    alpha?: boolean[] | boolean;
    colorModel?: ImageColorModel[] | ImageColorModel;
    components?: number[] | number;
    channels?: number[] | number;
}
/**
 * This method checks if a process can be applied on the current image
 *
 * @param image - Image for which compatibility has to be checked
 * @param processName - Name of the process to apply
 * @param options - Check processable options
 */
export default function checkProcessable(image: Image | Mask, processName: string, options?: CheckOptions): void;
export {};
//# sourceMappingURL=checkProcessable.d.ts.map