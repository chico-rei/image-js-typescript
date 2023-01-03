import { Image } from '../Image';
/**
 * Read an image from the disk.
 * The file format is automatically selected based on the first few bytes.
 *
 * @param path - The path to the image.
 * @returns Image instance.
 */
export declare function read(path: string | URL): Promise<Image>;
/**
 * Synchronous version of @see {@link read}.
 *
 * @param path - The path to the image.
 * @returns Image instance.
 */
export declare function readSync(path: string | URL): Image;
//# sourceMappingURL=read.d.ts.map