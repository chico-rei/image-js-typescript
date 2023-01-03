import { encode } from 'fast-png';
/**
 * Creates a PNG buffer from an image.
 *
 * @param image - The image instance.
 * @param options - PNG encoding options.
 * @returns The buffer.
 */
export function encodePng(image, options) {
    return encode(image.getRawImage(), options);
}
//# sourceMappingURL=encodePng.js.map