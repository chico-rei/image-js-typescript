import { Image } from '../Image';
export declare enum BorderType {
    CONSTANT = "CONSTANT",
    REPLICATE = "REPLICATE",
    REFLECT = "REFLECT",
    WRAP = "WRAP",
    REFLECT_101 = "REFLECT_101"
}
export type BorderInterpolationFunction = (column: number, row: number, channel: number, image: Image) => number;
/**
 * Pick the border interpolation algorithm.
 * The different algorithms are illustrated here:
 * https://vovkos.github.io/doxyrest-showcase/opencv/sphinx_rtd_theme/enum_cv_BorderTypes.html
 *
 * @param type - The border type.
 * @param value - A pixel value if BordetType.CONSTANT is used.
 * @returns The border interpolation function.
 */
export declare function getBorderInterpolation(type: BorderType, value: number): BorderInterpolationFunction;
/**
 * Interpolate using a constant point.
 *
 * @param point - The point to interpolate.
 * @param length  - The length of the image.
 * @returns The interpolated point.
 */
export declare function interpolateConstantPoint(point: number, length: number): number;
/**
 * Interpolate by replicating the border.
 *
 * @param point - The point to interpolate.
 * @param length - The length of the image.
 * @returns The interpolated point.
 */
export declare function interpolateReplicatePoint(point: number, length: number): number;
/**
 * Interpolate by reflecting the border.
 *
 * @param point - The point to interpolate.
 * @param length - The length of the image.
 * @returns The interpolated point.
 */
export declare function interpolateReflectPoint(point: number, length: number): number;
/**
 * Interpolate by wrapping the border.
 *
 * @param point - The point to interpolate.
 * @param length - The length of the image.
 * @returns The interpolated point.
 */
export declare function interpolateWrapPoint(point: number, length: number): number;
/**
 * Interpolate by reflecting the border.
 *
 * @param point - The point to interpolate.
 * @param length - The length of the image.
 * @returns The interpolated point.
 */
export declare function interpolateReflect101Point(point: number, length: number): number;
//# sourceMappingURL=interpolateBorder.d.ts.map