"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegressionVariables = exports.correctColor = void 0;
const ml_regression_multivariate_linear_1 = __importDefault(require("ml-regression-multivariate-linear"));
const Image_1 = require("../Image");
const checkProcessable_1 = __importDefault(require("../utils/checkProcessable"));
const clamp_1 = require("../utils/clamp");
const formatData_1 = require("./utils/formatData");
/**
 * Correct the colors in an image using the reference colors.
 * Algorithm is based on the paper "Color correction using improved linear regression algorithm".
 * DOI: 10.1109/ICTS.2015.7379874
 *
 * @param image - Image to process.
 * @param measuredColors - Colors from the image, which will be compared to the reference.
 * @param referenceColors - Reference colors.
 * @returns Image with the colors corrected.
 */
function correctColor(image, measuredColors, referenceColors) {
    (0, checkProcessable_1.default)(image, 'correctColor', {
        colorModel: [Image_1.ImageColorModel.RGB, Image_1.ImageColorModel.RGBA],
    });
    if (measuredColors.length !== referenceColors.length) {
        throw new Error('correctColor: number of measured colors and reference colors differ');
    }
    const inputData = (0, formatData_1.formatInputForMlr)(measuredColors, image.maxValue);
    const referenceData = (0, formatData_1.formatReferenceForMlr)(referenceColors, image.maxValue);
    const mlrRed = new ml_regression_multivariate_linear_1.default(inputData, referenceData.r);
    const mlrGreen = new ml_regression_multivariate_linear_1.default(inputData, referenceData.g);
    const mlrBlue = new ml_regression_multivariate_linear_1.default(inputData, referenceData.b);
    const result = Image_1.Image.createFrom(image);
    for (let row = 0; row < image.height; row++) {
        for (let column = 0; column < image.width; column++) {
            const pixel = image.getPixel(column, row);
            const variables = getRegressionVariables(pixel[0], pixel[1], pixel[2], image.maxValue);
            const clamp = (0, clamp_1.getClamp)(image);
            const newPixel = [0, 0, 0];
            const red = mlrRed.predict(variables)[0] * image.maxValue;
            const green = mlrGreen.predict(variables)[0] * image.maxValue;
            const blue = mlrBlue.predict(variables)[0] * image.maxValue;
            newPixel[0] = clamp(red);
            newPixel[1] = clamp(green);
            newPixel[2] = clamp(blue);
            if (image.alpha) {
                newPixel[3] = image.getValue(column, row, 3);
            }
            result.setPixel(column, row, newPixel);
        }
    }
    return result;
}
exports.correctColor = correctColor;
/**
 * Compute the third order variables for the regression from an RGB color.
 *
 * @param r - Red component.
 * @param g - Green component.
 * @param b - Blue component.
 * @param maxValue - Maximal acceptable value for the image to process.
 * @returns The variables for the multivariate linear regression.
 */
function getRegressionVariables(r, g, b, maxValue) {
    r /= maxValue;
    g /= maxValue;
    b /= maxValue;
    return [
        r,
        g,
        b,
        r ** 2,
        g ** 2,
        b ** 2,
        r ** 3,
        g ** 3,
        b ** 3,
        r * g,
        r * b,
        b * g,
    ];
}
exports.getRegressionVariables = getRegressionVariables;
//# sourceMappingURL=correctColor.js.map