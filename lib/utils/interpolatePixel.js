"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInterpolationFunction = exports.InterpolationType = void 0;
const round_1 = require("./round");
var InterpolationType;
(function (InterpolationType) {
    InterpolationType["NEAREST"] = "NEAREST";
    InterpolationType["BILINEAR"] = "BILINEAR";
    InterpolationType["BICUBIC"] = "BICUBIC";
})(InterpolationType = exports.InterpolationType || (exports.InterpolationType = {}));
/**
 * Get the interpolation function based on its name.
 *
 * @param interpolationType - Specified interpolation type.
 * @returns The interpolation function.
 */
function getInterpolationFunction(interpolationType) {
    switch (interpolationType) {
        case InterpolationType.NEAREST: {
            return interpolateNearest;
        }
        case InterpolationType.BILINEAR: {
            return interpolateBilinear;
        }
        case InterpolationType.BICUBIC: {
            return interpolateBicubic;
        }
        default: {
            throw new Error(`interpolation ${interpolationType} not implemented`);
        }
    }
}
exports.getInterpolationFunction = getInterpolationFunction;
/**
 * Interpolate using nearest neighbor.
 *
 * @param image - The image to interpolate.
 * @param column - Column index.
 * @param row - Row index.
 * @param channel - Channel index.
 * @param interpolateBorder - Border interpolation function.
 * @returns The interpolated value.
 */
function interpolateNearest(image, column, row, channel, interpolateBorder) {
    column = Math.round(column);
    row = Math.round(row);
    return interpolateBorder(column, row, channel, image);
}
/**
 * Interpolate using bilinear interpolation.
 *
 * @param image - The image to interpolate.
 * @param column - Column index.
 * @param row - Row index.
 * @param channel - Channel index.
 * @param interpolateBorder - Border interpolation function.
 * @returns The interpolated value.
 */
function interpolateBilinear(image, column, row, channel, interpolateBorder) {
    const px0 = Math.floor(column);
    const py0 = Math.floor(row);
    if (px0 === column && py0 === row) {
        return interpolateBorder(px0, py0, channel, image);
    }
    const px1 = px0 + 1;
    const py1 = py0 + 1;
    const vx0y0 = interpolateBorder(px0, py0, channel, image);
    const vx1y0 = interpolateBorder(px1, py0, channel, image);
    const vx0y1 = interpolateBorder(px0, py1, channel, image);
    const vx1y1 = interpolateBorder(px1, py1, channel, image);
    const r1 = (px1 - column) * vx0y0 + (column - px0) * vx1y0;
    const r2 = (px1 - column) * vx0y1 + (column - px0) * vx1y1;
    return (0, round_1.round)((py1 - row) * r1 + (row - py0) * r2);
}
/**
 * Interpolate using bicubic interpolation.
 *
 * @param image - The image to interpolate.
 * @param column - Column index.
 * @param row - Row index.
 * @param channel - Channel index.
 * @param interpolateBorder - Border interpolation function.
 * @param clamp - Clamp function.
 * @returns The interpolated value.
 */
function interpolateBicubic(image, column, row, channel, interpolateBorder, clamp) {
    const px1 = Math.floor(column);
    const py1 = Math.floor(row);
    if (px1 === column && py1 === row) {
        return interpolateBorder(px1, py1, channel, image);
    }
    const xNorm = column - px1;
    const yNorm = row - py1;
    const vx0y0 = interpolateBorder(px1 - 1, py1 - 1, channel, image);
    const vx1y0 = interpolateBorder(px1, py1 - 1, channel, image);
    const vx2y0 = interpolateBorder(px1 + 1, py1 - 1, channel, image);
    const vx3y0 = interpolateBorder(px1 + 2, py1 - 1, channel, image);
    const v0 = cubic(vx0y0, vx1y0, vx2y0, vx3y0, xNorm);
    const vx0y1 = interpolateBorder(px1 - 1, py1, channel, image);
    const vx1y1 = interpolateBorder(px1, py1, channel, image);
    const vx2y1 = interpolateBorder(px1 + 1, py1, channel, image);
    const vx3y1 = interpolateBorder(px1 + 2, py1, channel, image);
    const v1 = cubic(vx0y1, vx1y1, vx2y1, vx3y1, xNorm);
    const vx0y2 = interpolateBorder(px1 - 1, py1 + 1, channel, image);
    const vx1y2 = interpolateBorder(px1, py1 + 1, channel, image);
    const vx2y2 = interpolateBorder(px1 + 1, py1 + 1, channel, image);
    const vx3y2 = interpolateBorder(px1 + 2, py1 + 1, channel, image);
    const v2 = cubic(vx0y2, vx1y2, vx2y2, vx3y2, xNorm);
    const vx0y3 = interpolateBorder(px1 - 1, py1 + 2, channel, image);
    const vx1y3 = interpolateBorder(px1, py1 + 2, channel, image);
    const vx2y3 = interpolateBorder(px1 + 1, py1 + 2, channel, image);
    const vx3y3 = interpolateBorder(px1 + 2, py1 + 2, channel, image);
    const v3 = cubic(vx0y3, vx1y3, vx2y3, vx3y3, xNorm);
    return (0, round_1.round)(clamp(cubic(v0, v1, v2, v3, yNorm)));
}
/**
 * Cubic function.
 *
 * @param a - First value.
 * @param b - Second value.
 * @param c - Third value.
 * @param d - Fourth value.
 * @param x - X value.
 * @returns The interpolated value.
 */
function cubic(a, b, c, d, x) {
    return (b +
        0.5 *
            x *
            (c - a + x * (2 * a - 5 * b + 4 * c - d + x * (3 * (b - c) + d - a))));
}
//# sourceMappingURL=interpolatePixel.js.map