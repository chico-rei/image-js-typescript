export var BorderType;
(function (BorderType) {
    BorderType["CONSTANT"] = "CONSTANT";
    BorderType["REPLICATE"] = "REPLICATE";
    BorderType["REFLECT"] = "REFLECT";
    BorderType["WRAP"] = "WRAP";
    BorderType["REFLECT_101"] = "REFLECT_101";
})(BorderType || (BorderType = {}));
/**
 * Pick the border interpolation algorithm.
 * The different algorithms are illustrated here:
 * https://vovkos.github.io/doxyrest-showcase/opencv/sphinx_rtd_theme/enum_cv_BorderTypes.html
 *
 * @param type - The border type.
 * @param value - A pixel value if BordetType.CONSTANT is used.
 * @returns The border interpolation function.
 */
export function getBorderInterpolation(type, value) {
    switch (type) {
        case BorderType.CONSTANT:
            return getInterpolateConstant(value);
        case BorderType.REPLICATE:
            return interpolateReplicate;
        case BorderType.REFLECT:
            return interpolateReflect;
        case BorderType.REFLECT_101:
            return interpolateReflect101;
        case BorderType.WRAP:
            return interpolateWrap;
        default:
            throw new Error(`interpolateBorder cannot be used with border type ${type}`);
    }
}
function checkRange(point, length) {
    if (point <= 0 - length || point >= length + length - 1) {
        throw new RangeError('interpolateBorder only supports borders smaller than the original image');
    }
}
function getInterpolateConstant(value) {
    return function interpolateConstant(column, row, channel, image) {
        const newColumn = interpolateConstantPoint(column, image.width);
        const newRow = interpolateConstantPoint(row, image.height);
        if (newColumn === -1 || newRow === -1) {
            return value;
        }
        return image.getValue(newColumn, newRow, channel);
    };
}
/**
 * Interpolate using a constant point.
 *
 * @param point - The point to interpolate.
 * @param length  - The length of the image.
 * @returns The interpolated point.
 */
export function interpolateConstantPoint(point, length) {
    if (point >= 0 && point < length) {
        return point;
    }
    return -1;
}
function interpolateReplicate(column, row, channel, image) {
    return image.getValue(interpolateReplicatePoint(column, image.width), interpolateReplicatePoint(row, image.height), channel);
}
/**
 * Interpolate by replicating the border.
 *
 * @param point - The point to interpolate.
 * @param length - The length of the image.
 * @returns The interpolated point.
 */
export function interpolateReplicatePoint(point, length) {
    if (point >= 0 && point < length) {
        return point;
    }
    checkRange(point, length);
    if (point < 0) {
        return 0;
    }
    else {
        return length - 1;
    }
}
function interpolateReflect(column, row, channel, image) {
    return image.getValue(interpolateReflectPoint(column, image.width), interpolateReflectPoint(row, image.height), channel);
}
/**
 * Interpolate by reflecting the border.
 *
 * @param point - The point to interpolate.
 * @param length - The length of the image.
 * @returns The interpolated point.
 */
export function interpolateReflectPoint(point, length) {
    if (point >= 0 && point < length) {
        return point;
    }
    checkRange(point, length);
    if (point < 0) {
        return -1 - point;
    }
    else {
        return length + length - 1 - point;
    }
}
function interpolateWrap(column, row, channel, image) {
    return image.getValue(interpolateWrapPoint(column, image.width), interpolateWrapPoint(row, image.height), channel);
}
/**
 * Interpolate by wrapping the border.
 *
 * @param point - The point to interpolate.
 * @param length - The length of the image.
 * @returns The interpolated point.
 */
export function interpolateWrapPoint(point, length) {
    if (point >= 0 && point < length) {
        return point;
    }
    checkRange(point, length);
    if (point < 0) {
        return length + point;
    }
    else {
        return point - length;
    }
}
function interpolateReflect101(column, row, channel, image) {
    return image.getValue(interpolateReflect101Point(column, image.width), interpolateReflect101Point(row, image.height), channel);
}
/**
 * Interpolate by reflecting the border.
 *
 * @param point - The point to interpolate.
 * @param length - The length of the image.
 * @returns The interpolated point.
 */
export function interpolateReflect101Point(point, length) {
    if (point >= 0 && point < length) {
        return point;
    }
    checkRange(point, length);
    if (point < 0) {
        return 0 - point;
    }
    else {
        return length + length - 2 - point;
    }
}
//# sourceMappingURL=interpolateBorder.js.map