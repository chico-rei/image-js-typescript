import fs from 'node:fs';
import { decode } from './decode';
/**
 * Read an image from the disk.
 * The file format is automatically selected based on the first few bytes.
 *
 * @param path - The path to the image.
 * @returns Image instance.
 */
export async function read(path) {
    const data = await fs.promises.readFile(path);
    return decode(data);
}
/**
 * Synchronous version of @see {@link read}.
 *
 * @param path - The path to the image.
 * @returns Image instance.
 */
export function readSync(path) {
    return decode(fs.readFileSync(path));
}
//# sourceMappingURL=read.js.map