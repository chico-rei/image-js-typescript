"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatInputForMlr = exports.formatReferenceForMlr = exports.getReferenceColors = exports.getMeasuredColors = void 0;
const colord_1 = require("colord");
const lab_1 = __importDefault(require("colord/plugins/lab"));
const correctColor_1 = require("../correctColor");
(0, colord_1.extend)([lab_1.default]);
/**
 * Convert RGB array colors to RGB object colors. Used to get the properly formatted measured colors.
 *
 * @param arrayColors - Array of RGB colors as 3 elements array.
 * @returns Array of RGB objects.
 */
function getMeasuredColors(arrayColors) {
    const objectColors = [];
    for (let color of arrayColors) {
        objectColors.push({ r: color[0], g: color[1], b: color[2] });
    }
    return objectColors;
}
exports.getMeasuredColors = getMeasuredColors;
/**
 * Extract the colors from a QP card and convert them to RGB.
 *
 * @param qpCard - QP card containing the color reference values in L*a*b*.
 * @returns Array of reference RGB colors.
 */
function getReferenceColors(qpCard) {
    let result = [];
    for (let square of qpCard) {
        result.push((0, colord_1.colord)(square.lab).toRgb());
    }
    return result;
}
exports.getReferenceColors = getReferenceColors;
/**
 * Format and normalize data from a QP card to use as a reference in a multivariate linear regression.
 *
 * @param referenceColors - Array of RGB colors used as a reference.
 * @param maxValue - Maximal acceptable value for the image to process.
 * @returns The formatted data.
 */
function formatReferenceForMlr(referenceColors, maxValue) {
    const referenceData = { r: [], g: [], b: [] };
    for (let color of referenceColors) {
        referenceData.r.push([color.r / maxValue]);
        referenceData.g.push([color.g / maxValue]);
        referenceData.b.push([color.b / maxValue]);
    }
    return referenceData;
}
exports.formatReferenceForMlr = formatReferenceForMlr;
/**
 * Compute the variables for the multivariate linear regression based on the the input colors. Values are normalized between 0 and 1.
 *
 * @param inputColors - The input colors as an array of rgb objects.
 * @param maxValue - Maximal acceptable value for the image to process.
 * @returns The formatted input data for the regression.
 */
function formatInputForMlr(inputColors, maxValue) {
    const inputData = [];
    for (let color of inputColors) {
        inputData.push((0, correctColor_1.getRegressionVariables)(color.r, color.g, color.b, maxValue));
    }
    return inputData;
}
exports.formatInputForMlr = formatInputForMlr;
//# sourceMappingURL=formatData.js.map