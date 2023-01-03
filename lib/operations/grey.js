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
exports.grey = void 0;
const __1 = require("..");
const clamp_1 = require("../utils/clamp");
const getOutputImage_1 = require("../utils/getOutputImage");
const greyAlgorithms = __importStar(require("./greyAlgorithms"));
/**
 * Convert the current image to grayscale.
 * The source image has to be RGB or RGBA.
 * If there is an alpha channel you have to specify what to do:
 * - keepAlpha :  keep the alpha channel, you will get a GREYA image
 * - mergeAlpha : multiply each pixel of the image by the alpha, you will get a GREY image
 *
 * @param image - Original color image to convert to grey.
 * @param options - The grey conversion options.
 * @returns The resulting grey image.
 */
function grey(image, options = {}) {
    let { algorithm = 'luma709', keepAlpha = false, mergeAlpha = true } = options;
    if (image.colorModel !== __1.ImageColorModel.RGB &&
        image.colorModel !== __1.ImageColorModel.RGBA) {
        throw new Error('Image color model is not RGB or RGBA');
    }
    keepAlpha = keepAlpha && image.alpha;
    mergeAlpha = mergeAlpha && image.alpha;
    if (keepAlpha) {
        mergeAlpha = false;
    }
    let newColorModel = keepAlpha ? __1.ImageColorModel.GREYA : __1.ImageColorModel.GREY;
    let newImage = (0, getOutputImage_1.getOutputImage)(image, options, {
        newParameters: { colorModel: newColorModel },
    });
    let method;
    if (typeof algorithm === 'function') {
        method = algorithm;
    }
    else {
        // eslint-disable-next-line import/namespace
        method = greyAlgorithms[algorithm];
    }
    let clamp = (0, clamp_1.getClamp)(newImage);
    for (let i = 0; i < image.size; i++) {
        const red = image.getValueByIndex(i, 0);
        const green = image.getValueByIndex(i, 1);
        const blue = image.getValueByIndex(i, 2);
        let newValue;
        if (mergeAlpha) {
            const alpha = image.getValueByIndex(i, 3);
            newValue = clamp((method(red, green, blue, image) * alpha) / image.maxValue);
        }
        else {
            newValue = clamp(method(red, green, blue, image));
            if (keepAlpha) {
                const alpha = image.getValueByIndex(i, 3);
                newImage.setValueByIndex(i, 1, alpha);
            }
        }
        newImage.setValueByIndex(i, 0, newValue);
    }
    return newImage;
}
exports.grey = grey;
//# sourceMappingURL=grey.js.map