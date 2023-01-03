"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transform = void 0;
const ml_matrix_1 = require("ml-matrix");
const Image_1 = require("../Image");
const clamp_1 = require("../utils/clamp");
const interpolateBorder_1 = require("../utils/interpolateBorder");
const interpolatePixel_1 = require("../utils/interpolatePixel");
/**
 * Transforms an image using a matrix.
 *
 * @param image - Original image.
 * @param transformMatrix - 2×3 transform matrix.
 * @param options - Transform options.
 * @returns The new image.
 */
function transform(image, transformMatrix, options = {}) {
    const { borderType = interpolateBorder_1.BorderType.CONSTANT, borderValue = 0, interpolationType = interpolatePixel_1.InterpolationType.BILINEAR, fullImage, } = options;
    let { width = image.width, height = image.height } = options;
    if (fullImage) {
        transformMatrix = transformMatrix.map((row) => row.slice());
        transformMatrix[0][2] = 0;
        transformMatrix[1][2] = 0;
        const corners = [
            image.getCoordinates(Image_1.ImageCoordinates.TOP_LEFT),
            image.getCoordinates(Image_1.ImageCoordinates.TOP_RIGHT),
            image.getCoordinates(Image_1.ImageCoordinates.BOTTOM_RIGHT),
            image.getCoordinates(Image_1.ImageCoordinates.BOTTOM_LEFT),
        ];
        corners[1].column += 1;
        corners[2].column += 1;
        corners[2].row += 1;
        corners[3].row += 1;
        const transformedCorners = corners.map((corner) => {
            return [
                transformPoint(transformMatrix[0], corner.column, corner.row),
                transformPoint(transformMatrix[1], corner.column, corner.row),
            ];
        });
        const xCoordinates = transformedCorners.map((c) => c[0]);
        const yCoordinates = transformedCorners.map((c) => c[1]);
        const maxX = Math.max(...xCoordinates);
        const maxY = Math.max(...yCoordinates);
        const minX = Math.min(...xCoordinates);
        const minY = Math.min(...yCoordinates);
        const center = [(image.width - 1) / 2, (image.height - 1) / 2];
        width = maxX - minX;
        height = maxY - minY;
        const centerX = transformPoint(transformMatrix[0], center[0], center[1]);
        const centerY = transformPoint(transformMatrix[1], center[0], center[1]);
        const a = (width - 1) / 2 - centerX;
        const b = (height - 1) / 2 - centerY;
        transformMatrix[0][2] = a;
        transformMatrix[1][2] = b;
        width = Math.round(width);
        height = Math.round(height);
    }
    if (transformMatrix.length !== 2 ||
        transformMatrix[0].length !== 3 ||
        transformMatrix[1].length !== 3) {
        throw new Error(`transform: transformation matrix must be 2x3, found ${transformMatrix.length}x${transformMatrix[1].length}`);
    }
    if (!options.inverse) {
        transformMatrix = [transformMatrix[0], transformMatrix[1], [0, 0, 1]];
        transformMatrix = (0, ml_matrix_1.inverse)(new ml_matrix_1.Matrix(transformMatrix)).to2DArray();
    }
    const newImage = Image_1.Image.createFrom(image, {
        width,
        height,
    });
    const interpolateBorder = (0, interpolateBorder_1.getBorderInterpolation)(borderType, borderValue);
    const clamp = (0, clamp_1.getClamp)(newImage);
    const interpolate = (0, interpolatePixel_1.getInterpolationFunction)(interpolationType);
    for (let row = 0; row < newImage.height; row++) {
        for (let column = 0; column < newImage.width; column++) {
            const nx = transformPoint(transformMatrix[0], column, row);
            const ny = transformPoint(transformMatrix[1], column, row);
            for (let channel = 0; channel < newImage.channels; channel++) {
                const newValue = interpolate(image, nx, ny, channel, interpolateBorder, clamp);
                newImage.setValue(column, row, channel, newValue);
            }
        }
    }
    return newImage;
}
exports.transform = transform;
/**
 * Apply a transformation to a point.
 *
 * @param transform - Transformation matrix.
 * @param column - Column of the point.
 * @param row - Row of the point.
 * @returns New value.
 */
function transformPoint(transform, column, row) {
    return transform[0] * column + transform[1] * row + transform[2];
}
//# sourceMappingURL=transform.js.map