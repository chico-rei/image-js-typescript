import { ColorDepth } from '..';
import { Image, ImageColorModel } from '../Image';
import { Mask } from '../Mask';
import { copyData } from './copyData';
/**
 * Use this function to support getting the output image of an algorithm from
 * user-supplied options.
 *
 * @param thisImage - Current image on which the algorithm is applied.
 * @param options - Options object received by the algorithm.
 * @param internalOptions - Some additional private options.
 * @returns The output image.
 */
export function getOutputImage(thisImage, options = {}, internalOptions = {}) {
    const { out } = options;
    const { newParameters, clone } = internalOptions;
    if (out === undefined) {
        if (clone) {
            return thisImage.clone();
        }
        else {
            return Image.createFrom(thisImage, newParameters);
        }
    }
    else {
        if (!(out instanceof Image)) {
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
            copyData(thisImage, out);
        }
        return out;
    }
}
/**
 * Use this function to support getting the output image of an algorithm from
 * user-supplied options when the input is a mask.
 *
 * @param mask - Current mask on which the algorithm is applied.
 * @param options - Options object received by the algorithm.
 * @returns The output image.
 */
export function maskToOutputImage(mask, options = {}) {
    const { out } = options;
    if (out === undefined) {
        return Image.createFrom(mask, {
            colorModel: ImageColorModel.GREY,
        });
    }
    else {
        if (!(out instanceof Image)) {
            throw new TypeError('out must be an Image object');
        }
        const requirements = {
            width: mask.width,
            height: mask.height,
            depth: ColorDepth.UINT8,
            colorModel: ImageColorModel.GREY,
        };
        checkRequirements(requirements, out);
        return out;
    }
}
/**
 * Use this function to support getting the output mask of an algorithm from
 * user-supplied options when the input is an image.
 *
 * @param image - Current image on which the algorithm is applied.
 * @param options - Options object received by the algorithm.
 * @returns The output mask.
 */
export function imageToOutputMask(image, options = {}) {
    const { out } = options;
    if (out === undefined) {
        return Mask.createFrom(image);
    }
    else {
        if (!(out instanceof Mask)) {
            throw new TypeError('out must be a Mask object');
        }
        const requirements = {
            width: image.width,
            height: image.height,
            depth: ColorDepth.UINT1,
            colorModel: ImageColorModel.BINARY,
        };
        checkRequirements(requirements, out);
        return out;
    }
}
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
export function maskToOutputMask(mask, options = {}, internalOptions = {}) {
    const { out } = options;
    const { newParameters, clone } = internalOptions;
    if (out === undefined) {
        if (clone) {
            return mask.clone();
        }
        else {
            return Mask.createFrom(mask, newParameters);
        }
    }
    else {
        if (!(out instanceof Mask)) {
            throw new TypeError('out must be a Mask object');
        }
        const requirements = {
            width: mask.width,
            height: mask.height,
            depth: ColorDepth.UINT1,
            colorModel: ImageColorModel.BINARY,
        };
        checkRequirements(requirements, out);
        if (clone && mask !== out) {
            copyData(mask, out);
        }
        return out;
    }
}
//# sourceMappingURL=getOutputImage.js.map