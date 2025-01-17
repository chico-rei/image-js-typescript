import { Image } from '../Image';
export type ClampFunction = (value: number) => number;
/**
 * Get the clamp function for an image (depends on the image bit depth)
 *
 * @param image - The image for which the clamp function is needed.
 * @returns The clamp function.
 */
export declare function getClamp(image: Image): ClampFunction;
/**
 * Get a function that clamps a value to a given range.
 *
 * @param min - Lower threshold.
 * @param max - Upper threshold.
 * @returns The clamping function.
 */
export declare function getClampFromTo(min: number, max: number): (value: number) => number;
//# sourceMappingURL=clamp.d.ts.map