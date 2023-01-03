import { Image } from '../Image';
import { ClampFunction } from './clamp';
import { BorderInterpolationFunction } from './interpolateBorder';
export declare enum InterpolationType {
    NEAREST = "NEAREST",
    BILINEAR = "BILINEAR",
    BICUBIC = "BICUBIC"
}
type InterpolationFunction = (image: Image, column: number, row: number, channel: number, intepolateBorder: BorderInterpolationFunction, clamp: ClampFunction) => number;
/**
 * Get the interpolation function based on its name.
 *
 * @param interpolationType - Specified interpolation type.
 * @returns The interpolation function.
 */
export declare function getInterpolationFunction(interpolationType: InterpolationType): InterpolationFunction;
export {};
//# sourceMappingURL=interpolatePixel.d.ts.map