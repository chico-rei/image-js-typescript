"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeConvolutionValue = exports.separableConvolution = exports.rawDirectConvolution = exports.directConvolution = void 0;
const ml_convolution_1 = require("ml-convolution");
const ml_matrix_1 = require("ml-matrix");
const Image_1 = require("../Image");
const clamp_1 = require("../utils/clamp");
const getIndex_1 = require("../utils/getIndex");
const getOutputImage_1 = require("../utils/getOutputImage");
const interpolateBorder_1 = require("../utils/interpolateBorder");
const round_1 = require("../utils/round");
/**
 * Apply a direct convolution on an image using the specified kernel. The convolution corresponds of a weighted average of the surrounding pixels, the weights being defined in the kernel.
 *
 * @param image - The image to process.
 * @param kernel - Kernel to use for the convolution. Should be a 2D matrix with odd number of rows and columns.
 * @param options - Convolution options.
 * @returns The convoluted image.
 */
function directConvolution(image, kernel, options = {}) {
    const { borderType = interpolateBorder_1.BorderType.REFLECT_101, borderValue = 0 } = options;
    const convolutedData = rawDirectConvolution(image, kernel, {
        borderType,
        borderValue,
    });
    const newImage = (0, getOutputImage_1.getOutputImage)(image, options);
    const clamp = (0, clamp_1.getClamp)(newImage);
    for (let i = 0; i < image.size; i++) {
        for (let channel = 0; channel < image.channels; channel++) {
            let dataIndex = i * image.channels + channel;
            let newValue = (0, round_1.round)(clamp(convolutedData[dataIndex]));
            newImage.setValueByIndex(i, channel, newValue);
        }
    }
    return newImage;
}
exports.directConvolution = directConvolution;
/**
 * Compute direct convolution of an image and return an array with the raw values.
 *
 * @param image - Image to process.
 * @param kernel - 2D kernel used for the convolution.
 * @param options - Convolution options.
 * @returns Array with the raw convoluted values.
 */
function rawDirectConvolution(image, kernel, options = {}) {
    const { borderType = interpolateBorder_1.BorderType.REFLECT_101, borderValue = 0 } = options;
    const interpolateBorder = (0, interpolateBorder_1.getBorderInterpolation)(borderType, borderValue);
    let result = new Float64Array(image.size * image.channels);
    for (let channel = 0; channel < image.channels; channel++) {
        for (let row = 0; row < image.height; row++) {
            for (let column = 0; column < image.width; column++) {
                let index = (0, getIndex_1.getIndex)(column, row, image, channel);
                result[index] = computeConvolutionValue(column, row, channel, image, kernel, interpolateBorder, { returnRawValue: true });
            }
        }
    }
    return result;
}
exports.rawDirectConvolution = rawDirectConvolution;
/**
 * Compute the separable convolution of an image.
 *
 * @param image - Image to convolute.
 * @param kernelX - Kernel along x axis.
 * @param kernelY - Kernel along y axis.
 * @param options - Convolution options.
 * @returns The convoluted image.
 */
function separableConvolution(image, kernelX, kernelY, options = {}) {
    const { normalize, borderType = interpolateBorder_1.BorderType.REFLECT_101, borderValue = 0, } = options;
    const interpolateBorder = (0, interpolateBorder_1.getBorderInterpolation)(borderType, borderValue);
    if (normalize) {
        [kernelX, kernelY] = normalizeSeparatedKernel(kernelX, kernelY);
    }
    const doubleKernelOffsetX = kernelX.length - 1;
    const kernelOffsetX = doubleKernelOffsetX / 2;
    const doubleKernelOffsetY = kernelY.length - 1;
    const kernelOffsetY = doubleKernelOffsetY / 2;
    const { width, height, channels } = image;
    const cutWidth = width - doubleKernelOffsetX;
    const newImage = Image_1.Image.createFrom(image);
    const clamp = (0, clamp_1.getClamp)(newImage);
    const rowConvolution = new ml_convolution_1.DirectConvolution(width, kernelX, ml_convolution_1.BorderType.CUT);
    const columnConvolution = new ml_convolution_1.DirectConvolution(height, kernelY, ml_convolution_1.BorderType.CUT);
    const rowData = new Float64Array(width);
    const columnData = new Float64Array(height);
    const convolvedData = new Float64Array(cutWidth * height);
    for (let channel = 0; channel < channels; channel++) {
        for (let row = 0; row < height; row++) {
            for (let column = 0; column < width; column++) {
                rowData[column] = image.getValue(column, row, channel);
            }
            const convolvedRow = rowConvolution.convolve(rowData);
            for (let column = 0; column < cutWidth; column++) {
                convolvedData[row * cutWidth + column] = convolvedRow[column];
            }
        }
        for (let column = 0; column < cutWidth; column++) {
            const wOffset = column + kernelOffsetX;
            for (let row = 0; row < height; row++) {
                columnData[row] = convolvedData[row * cutWidth + column];
            }
            const result = columnConvolution.convolve(columnData);
            for (let i = 0; i < result.length; i++) {
                const index = (i + kernelOffsetY) * width + wOffset;
                newImage.setValueByIndex(index, channel, (0, round_1.round)(clamp(result[i])));
            }
        }
    }
    // Calculate kernel from separated kernels.
    const matrixX = ml_matrix_1.Matrix.rowVector(kernelX);
    const matrixY = ml_matrix_1.Matrix.columnVector(kernelY);
    const kernel = matrixY.mmul(matrixX).to2DArray();
    // Apply convolution on the left and right borders
    for (let channel = 0; channel < channels; channel++) {
        for (let bY = 0; bY < height; bY++) {
            for (let bX = 0; bX < kernelOffsetX; bX++) {
                const index = bY * width + bX;
                const bXopp = width - bX - 1;
                const bYopp = height - bY - 1;
                const indexOpp = bYopp * width + bXopp;
                newImage.setValueByIndex(index, channel, computeConvolutionValue(bX, bY, channel, image, kernel, interpolateBorder, { clamp }));
                newImage.setValueByIndex(indexOpp, channel, computeConvolutionValue(bXopp, bYopp, channel, image, kernel, interpolateBorder, { clamp }));
            }
        }
    }
    // apply the convolution on the top and bottom borders
    for (let channel = 0; channel < channels; channel++) {
        for (let bX = 0; bX < width; bX++) {
            for (let bY = 0; bY < kernelOffsetY; bY++) {
                const index = bY * width + bX;
                const bXopp = width - bX - 1;
                const bYopp = height - bY - 1;
                const indexOpp = bYopp * width + bXopp;
                newImage.setValueByIndex(index, channel, computeConvolutionValue(bX, bY, channel, image, kernel, interpolateBorder, { clamp }));
                newImage.setValueByIndex(indexOpp, channel, computeConvolutionValue(bXopp, bYopp, channel, image, kernel, interpolateBorder, { clamp }));
            }
        }
    }
    return newImage;
}
exports.separableConvolution = separableConvolution;
/**
 * Compute the convolution of a value of a pixel in an image.
 *
 * @param column - Column of the pixel.
 * @param row - Row of the pixel.
 * @param channel - Channel to process.
 * @param image - Image to process.
 * @param kernel - Kernel for the convolutions.
 * @param interpolateBorder - Function to interpolate the border pixels.
 * @param options - Compute convolution value options.
 * @returns The convoluted value.
 */
function computeConvolutionValue(column, row, channel, image, kernel, interpolateBorder, options = {}) {
    let { returnRawValue = false, clamp } = options;
    if (returnRawValue) {
        clamp = undefined;
    }
    let val = 0;
    const kernelWidth = kernel[0].length;
    const kernelHeight = kernel.length;
    const kernelOffsetX = (kernelWidth - 1) / 2;
    const kernelOffsetY = (kernelHeight - 1) / 2;
    for (let kY = 0; kY < kernelHeight; kY++) {
        for (let kX = 0; kX < kernelWidth; kX++) {
            const kernelValue = kernel[kY][kX];
            val +=
                kernelValue *
                    interpolateBorder(column + kX - kernelOffsetX, row + kY - kernelOffsetY, channel, image);
        }
    }
    if (!clamp) {
        return val;
    }
    else {
        return (0, round_1.round)(clamp(val));
    }
}
exports.computeConvolutionValue = computeConvolutionValue;
/**
 * Normalize a separated kernel.
 *
 * @param kernelX - Horizontal component of the separated kernel.
 * @param kernelY - Vertical component of the separated kernel.
 * @returns The normalized kernel.
 */
function normalizeSeparatedKernel(kernelX, kernelY) {
    const sumKernelX = kernelX.reduce((prev, current) => prev + current, 0);
    const sumKernelY = kernelY.reduce((prev, current) => prev + current, 0);
    const prod = sumKernelX * sumKernelY;
    if (prod < 0) {
        throw new Error('this separated kernel cannot be normalized');
    }
    const factor = 1 / Math.sqrt(Math.abs(prod));
    return [kernelX.map((v) => v * factor), kernelY.map((v) => v * factor)];
}
//# sourceMappingURL=convolution.js.map