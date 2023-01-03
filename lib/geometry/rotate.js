"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rotate = void 0;
const Image_1 = require("../Image");
const transform_1 = require("./transform");
/**
 * Rotate an image anti-clockwise of a given angle.
 *
 * @param image - Original image.
 * @param angle - Angle in degrees.
 * @param options - Rotate options.
 * @returns A new rotated image.
 */
function rotate(image, angle, options = {}) {
    const { center = Image_1.ImageCoordinates.CENTER, scale = 1 } = options;
    let centerCoordinates;
    if (typeof center === 'string') {
        centerCoordinates = image.getCoordinates(center);
    }
    else {
        centerCoordinates = center;
    }
    const transformMatrix = getRotationMatrix(angle, centerCoordinates, scale);
    return (0, transform_1.transform)(image, transformMatrix, options);
}
exports.rotate = rotate;
/**
 * Generates a rotation matrix for the given angle.
 *
 * @param angle - Angle in degrees.
 * @param center - Center point of the image.
 * @param scale - Scaling factor.
 * @returns 2 x 3 rotation matrix.
 */
function getRotationMatrix(angle, center, scale) {
    const angleRadians = (angle * Math.PI) / 180;
    const cos = scale * Math.cos(angleRadians);
    const sin = scale * Math.sin(angleRadians);
    return [
        [cos, sin, (1 - cos) * center.column - sin * center.row],
        [-sin, cos, sin * center.column + (1 - cos) * center.row],
    ];
}
//# sourceMappingURL=rotate.js.map