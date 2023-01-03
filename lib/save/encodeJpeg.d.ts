import { Image } from '../Image';
export interface EncodeJpegOptions {
    /**
     * Defines jpeg quality. Integer value between 1 and 100%, 100% being the best quality.
     *
     * @default 50
     */
    quality?: number;
}
/**
 * Creates a JPEG buffer from an image.
 *
 * @param image - The image instance.
 * @param options - JPEG encoding options.
 * @returns The buffer.
 */
export declare function encodeJpeg(image: Image, options?: EncodeJpegOptions): Uint8Array;
//# sourceMappingURL=encodeJpeg.d.ts.map