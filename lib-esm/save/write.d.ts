import { Mask, Image } from '..';
import { EncodeOptionsPng, EncodeOptionsJpeg } from './encode';
/**
 * Write an image to the disk.
 * The file format is determined automatically from the file's extension.
 * If the extension is not supported, an error will be thrown.
 *
 * @param path - Path where the image should be written.
 * @param image - Image to save.
 */
export declare function write(path: string, image: Image | Mask): Promise<void>;
/**
 * Write an image to the disk as PNG.
 * When the `png` format is specified, the file's extension doesn't matter.
 *
 * @param path - Path where the image should be written.
 * @param image - Image to save.
 * @param options - Encode options for png images.
 */
export declare function write(path: string, image: Image | Mask, options: EncodeOptionsPng): Promise<void>;
/**
 * Write an image to the disk as JPEG.
 * When the `jpeg` format is specified, the file's extension doesn't matter.
 *
 * @param path - Path where the image should be written.
 * @param image - Image to save.
 * @param options - Encode options for jpeg images.
 */
export declare function write(path: string, image: Image | Mask, options: EncodeOptionsJpeg): Promise<void>;
/**
 * Synchronous version of @see {@link write}.
 *
 * @param path - Path where the image should be written.
 * @param image - Image to save.
 * @param options - Encode options.
 */
export declare function writeSync(path: string, image: Image | Mask, options?: EncodeOptionsPng | EncodeOptionsJpeg): void;
//# sourceMappingURL=write.d.ts.map