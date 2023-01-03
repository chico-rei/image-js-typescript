import { PngEncoderOptions } from 'fast-png';
import { Image } from '../Image';
export type EncodePngOptions = PngEncoderOptions;
/**
 * Creates a PNG buffer from an image.
 *
 * @param image - The image instance.
 * @param options - PNG encoding options.
 * @returns The buffer.
 */
export declare function encodePng(image: Image, options?: EncodePngOptions): Uint8Array;
//# sourceMappingURL=encodePng.d.ts.map