import { Image } from '../Image';
import { EncodeJpegOptions } from './encodeJpeg';
import { EncodePngOptions } from './encodePng';
export declare enum ImageFormat {
    png = "png",
    jpg = "jpg",
    jpeg = "jpeg"
}
export interface EncodeOptionsPng {
    format: ImageFormat.png;
    encoderOptions?: EncodePngOptions;
}
export interface EncodeOptionsJpeg {
    format: ImageFormat.jpg | ImageFormat.jpeg;
    encoderOptions?: EncodeJpegOptions;
}
/**
 * Encodes the image to an output format.
 * Defaults to PNG.
 *
 * @param image - Image to encode.
 * @returns The encoded image
 */
export declare function encode(image: Image): Uint8Array;
/**
 * Encodes the image to PNG.
 *
 * @param image - Image to encode.
 * @param options - Format and options passed to the PNG encoder.
 * @returns The encoded image
 */
export declare function encode(image: Image, options: EncodeOptionsPng): Uint8Array;
/**
 * Encodes the image to JPEG.
 *
 * @param image - Image to encode.
 * @param options - Format and options passed to the JPEG encoder.
 * @returns The encoded image
 */
export declare function encode(image: Image, options: EncodeOptionsJpeg): Uint8Array;
//# sourceMappingURL=encode.d.ts.map