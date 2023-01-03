"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maskToOutputMask = exports.imageToOutputMask = exports.maskToOutputImage = exports.getOutputImage = void 0;
const __1 = require("..");
const Image_1 = require("../Image");
const Mask_1 = require("../Mask");
const copyData_1 = require("./copyData");
/**
 * Use this function to support getting the output image of an algorithm from
 * user-supplied options.
 *
 * @param thisImage - Current image on which the algorithm is applied.
 * @param options - Options object received by the algorithm.
 * @param internalOptions - Some additional private options.
 * @returns The output image.
 */
function getOutputImage(thisImage, options = {}, internalOptions = {}) {
    const { out } = options;
    const { newParameters, clone } = internalOptions;
    if (out === undefined) {
        if (clone) {
            return thisImage.clone();
        }
        else {
            return Image_1.Image.createFrom(thisImage, newParameters);
        }
    }
    else {
        if (!(out instanceof Image_1.Image)) {
            throw new TypeError('out must be an Image object');
        }
        const requirements = {
            width: thisImage.width,
            height: thisImage.height,
            depth: thisImage.depth,
            colorModel: thisImage.colorModel,
            ...newParameters,
        };
        checkRequirements(requirements, out);
        if (clone && thisImage !== out) {
            (0, copyData_1.copyData)(thisImage, out);
        }
        return out;
    }
}
exports.getOutputImage = getOutputImage;
/**
 * Use this function to support getting the output image of an algorithm from
 * user-supplied options when the input is a mask.
 *
 * @param mask - Current mask on which the algorithm is applied.
 * @param options - Options object received by the algorithm.
 * @returns The output image.
 */
function maskToOutputImage(mask, options = {}) {
    const { out } = options;
    if (out === undefined) {
        return Image_1.Image.createFrom(mask, {
            colorModel: Image_1.ImageColorModel.GREY,
        });
    }
    else {
        if (!(out instanceof Image_1.Image)) {
            throw new TypeError('out must be an Image object');
        }
        const requirements = {
            width: mask.width,
            height: mask.height,
            depth: __1.ColorDepth.UINT8,
            colorModel: Image_1.ImageColorModel.GREY,
        };
        checkRequirements(requirements, out);
        return out;
    }
}
exports.maskToOutputImage = maskToOutputImage;
/**
 * Use this function to support getting the output mask of an algorithm from
 * user-supplied options when the input is an image.
 *
 * @param image - Current image on which the algorithm is applied.
 * @param options - Options object received by the algorithm.
 * @returns The output mask.
 */
function imageToOutputMask(image, options = {}) {
    const { out } = options;
    if (out === undefined) {
        return Mask_1.Mask.createFrom(image);
    }
    else {
        if (!(out instanceof Mask_1.Mask)) {
            throw new TypeError('out must be a Mask object');
        }
        const requirements = {
            width: image.width,
            height: image.height,
            depth: __1.ColorDepth.UINT1,
            colorModel: Image_1.ImageColorModel.BINARY,
        };
        checkRequirements(requirements, out);
        return out;
    }
}
exports.imageToOutputMask = imageToOutputMask;
function checkRequirements(requirements, out) {
    for (const property in requirements) {
        const prop = property;
        if (out[prop] !== requirements[prop]) {
            throw new RangeError(`cannot use out. Its ${property} property must be ${requirements[prop]}. Found ${out[prop]}`);
        }
    }
}
/**
 * Use this function to support getting the output mask of an algorithm from
 * user-supplied options when the input is an mask.
 *
 * @param mask - Current mask on which the algorithm is applied.
 * @param options - Options object received by the algorithm.
 * @param internalOptions - Additional private options.
 * @returns The output mask.
 */
function maskToOutputMask(mask, options = {}, internalOptions = {}) {
    const { out } = options;
    const { newParameters, clone } = internalOptions;
    if (out === undefined) {
        if (clone) {
            return mask.clone();
        }
        else {
            return Mask_1.Mask.createFrom(mask, newParameters);
        }
    }
    else {
        if (!(out instanceof Mask_1.Mask)) {
            throw new TypeError('out must be a Mask object');
        }
        const requirements = {
            width: mask.width,
            height: mask.height,
            depth: __1.ColorDepth.UINT1,
            colorModel: Image_1.ImageColorModel.BINARY,
        };
        checkRequirements(requirements, out);
        if (clone && mask !== out) {
            (0, copyData_1.copyData)(mask, out);
        }
        return out;
    }
}
exports.maskToOutputMask = maskToOutputMask;
//# sourceMappingURL=getOutputImage.js.map