"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHarrisScore = void 0;
const ml_matrix_1 = __importStar(require("ml-matrix"));
const kernels_1 = require("../utils/constants/kernels");
/**
 * Get the Harris score of a corner. The idea behind the algorithm is that a
 * slight shift of a window around a corner along x and y shoud result in
 * a very different image.
 * https://en.wikipedia.org/wiki/Harris_corner_detector#:~:text=The%20Harris%20corner%20detector%20is,improvement%20of%20Moravec's%20corner%20detector.
 *
 * We distinguish 3 cases:
 * - the score is highly negative: you have an edge
 * - the abolute value of the score is small: the region is flat
 * - the score is highly positive: you have a corner
 *
 * @param image - Image to which the corner belongs. It must be a greyscale image with only one channel.
 * @param origin - Center of the window, where the corner should be.
 * @param options - Get Harris score options.
 * @returns The Harris score.
 */
function getHarrisScore(image, origin, options = {}) {
    const { windowSize = 7, harrisConstant = 0.04 } = options;
    if (!(windowSize % 2)) {
        throw new Error('getHarrisScore: windowSize should be an odd integer');
    }
    const cropOrigin = {
        row: origin.row - (windowSize - 1) / 2,
        column: origin.column - (windowSize - 1) / 2,
    };
    const window = image.crop({
        origin: cropOrigin,
        width: windowSize,
        height: windowSize,
    });
    const xDerivative = window.gradientFilter({ kernelX: kernels_1.SOBEL_X });
    const yDerivative = window.gradientFilter({ kernelY: kernels_1.SOBEL_Y });
    const xMatrix = new ml_matrix_1.WrapperMatrix1D(xDerivative.getRawImage().data, {
        rows: xDerivative.height,
    });
    const yMatrix = new ml_matrix_1.WrapperMatrix1D(yDerivative.getRawImage().data, {
        rows: yDerivative.height,
    });
    const xx = xMatrix.mmul(xMatrix);
    const xy = yMatrix.mmul(xMatrix);
    const yy = yMatrix.mmul(yMatrix);
    const xxSum = xx.sum();
    const xySum = xy.sum();
    const yySum = yy.sum();
    const structureTensor = new ml_matrix_1.default([
        [xxSum, xySum],
        [xySum, yySum],
    ]);
    const eigenValues = new ml_matrix_1.EigenvalueDecomposition(structureTensor)
        .realEigenvalues;
    return (eigenValues[0] * eigenValues[1] -
        harrisConstant * Math.pow(eigenValues[0] + eigenValues[1], 2));
}
exports.getHarrisScore = getHarrisScore;
//# sourceMappingURL=getHarrisScore.js.map