"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDirection = exports.cannyEdgeDetector = void 0;
const __1 = require("..");
const checkProcessable_1 = __importDefault(require("../utils/checkProcessable"));
const getIndex_1 = require("../utils/getIndex");
const getOutputImage_1 = require("../utils/getOutputImage");
const kernelX = [
    [-1, 0, +1],
    [-2, 0, +2],
    [-1, 0, +1],
];
const kernelY = [
    [-1, -2, -1],
    [0, 0, 0],
    [+1, +2, +1],
];
/**
 * Apply Canny edge detection to an image.
 *
 * @param image - Image to process.
 * @param options - Canny edge detection options.
 * @returns The processed image.
 */
function cannyEdgeDetector(image, options = {}) {
    const { hysteresis = true, lowThreshold = 0.04, highThreshold = 0.1, gaussianBlurOptions = { sigma: 1 }, } = options;
    const minValue = lowThreshold * image.maxValue;
    const maxValue = highThreshold * image.maxValue;
    (0, checkProcessable_1.default)(image, 'cannyEdgeDetector', {
        colorModel: __1.ImageColorModel.GREY,
    });
    const width = image.width;
    const height = image.height;
    const blurred = image.gaussianBlur(gaussianBlurOptions);
    const gradientX = blurred.rawDirectConvolution(kernelY);
    const gradientY = blurred.rawDirectConvolution(kernelX);
    let gradient = new Float64Array(image.size);
    for (let i = 0; i < image.size; i++) {
        gradient[i] = Math.hypot(gradientX[i], gradientY[i]);
    }
    let nonMaxSuppression = new Float64Array(image.size);
    let edges = new Float64Array(image.size);
    const finalImage = (0, getOutputImage_1.imageToOutputMask)(image, options);
    // Non-Maximum suppression
    for (let column = 1; column < width - 1; column++) {
        for (let row = 1; row < height - 1; row++) {
            const currentGradientX = gradientX[(0, getIndex_1.getIndex)(column, row, image, 0)];
            const currentGradientY = gradientY[(0, getIndex_1.getIndex)(column, row, image, 0)];
            let direction = getDirection(currentGradientX, currentGradientY);
            const currentGradient = gradient[(0, getIndex_1.getIndex)(column, row, image, 0)];
            if (
            // horizontal
            (direction === 0 &&
                currentGradient >= gradient[(0, getIndex_1.getIndex)(column, row - 1, image, 0)] &&
                currentGradient >= gradient[(0, getIndex_1.getIndex)(column, row + 1, image, 0)]) ||
                // upward slope
                (direction === 1 &&
                    currentGradient >=
                        gradient[(0, getIndex_1.getIndex)(column - 1, row - 1, image, 0)] &&
                    currentGradient >=
                        gradient[(0, getIndex_1.getIndex)(column + 1, row + 1, image, 0)]) ||
                // vertical
                (direction === 2 &&
                    currentGradient >= gradient[(0, getIndex_1.getIndex)(column - 1, row, image, 0)] &&
                    currentGradient >= gradient[(0, getIndex_1.getIndex)(column + 1, row, image, 0)]) ||
                // downward slope
                (direction === 3 &&
                    currentGradient >=
                        gradient[(0, getIndex_1.getIndex)(column - 1, row + 1, image, 0)] &&
                    currentGradient >= gradient[(0, getIndex_1.getIndex)(column + 1, row - 1, image, 0)])) {
                // pixels to remove from the final image
                nonMaxSuppression[(0, getIndex_1.getIndex)(column, row, image, 0)] = currentGradient;
            }
        }
    }
    for (let i = 0; i < width * height; ++i) {
        let currentNms = nonMaxSuppression[i];
        let currentEdge = 0;
        if (currentNms > maxValue) {
            currentEdge++;
            finalImage.setBitByIndex(i, 1);
        }
        if (currentNms > minValue) {
            currentEdge++;
        }
        edges[i] = currentEdge;
    }
    // Hysteresis: first pass
    if (hysteresis) {
        let currentPixels = [];
        for (let column = 1; column < width - 1; ++column) {
            for (let row = 1; row < height - 1; ++row) {
                if (edges[(0, getIndex_1.getIndex)(column, row, image, 0)] !== 1) {
                    continue;
                }
                outer: for (let hystColumn = column - 1; hystColumn < column + 2; ++hystColumn) {
                    for (let hystRow = row - 1; hystRow < row + 2; ++hystRow) {
                        if (edges[(0, getIndex_1.getIndex)(hystColumn, hystRow, image, 0)] === 2) {
                            currentPixels.push([column, row]);
                            finalImage.setValue(column, row, 0, 1);
                            break outer;
                        }
                    }
                }
            }
        }
        // Hysteresis: second pass
        while (currentPixels.length > 0) {
            let newPixels = [];
            for (let currentPixel of currentPixels) {
                for (let j = -1; j < 2; ++j) {
                    for (let k = -1; k < 2; ++k) {
                        if (j === 0 && k === 0) {
                            continue;
                        }
                        let row = currentPixel[0] + j;
                        let column = currentPixel[1] + k;
                        if (
                        // there could be an error here
                        edges[(0, getIndex_1.getIndex)(column, row, image, 0)] === 1 &&
                            finalImage.getValue(column, row, 0) === 0) {
                            newPixels.push([row, column]);
                            finalImage.setValue(column, row, 0, 1);
                        }
                    }
                }
            }
            currentPixels = newPixels;
        }
    }
    return finalImage;
    /* Function for debug
    import { Matrix } from 'ml-matrix';
  
    function printArray(array: Float64Array): void {
      // @ts-expect-error: only for debug
      const matrix = Matrix.from1DArray(height, width, array);
      console.log(matrix);
    }
    */
}
exports.cannyEdgeDetector = cannyEdgeDetector;
/**
 * Return a 0 to 3 value indicating the four main directions (horizontal, upward diagonal, vertical, downward diagonal).
 *
 * @param x - The x coordinate
 * @param y - The y coordinate
 * @returns The direction as a 0 to 4 value.
 */
function getDirection(x, y) {
    return (Math.round(Math.atan2(y, x) * (4 / Math.PI)) + 4) % 4;
}
exports.getDirection = getDirection;
//# sourceMappingURL=cannyEdgeDetector.js.map