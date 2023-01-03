"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-expect-error Intl types don't exist yet
const formatter = new Intl.ListFormat('en', { type: 'disjunction' });
/**
 * This method checks if a process can be applied on the current image
 *
 * @param image - Image for which compatibility has to be checked
 * @param processName - Name of the process to apply
 * @param options - Check processable options
 */
function checkProcessable(image, processName, options = {}) {
    let { bitDepth, alpha, colorModel, components, channels } = options;
    if (bitDepth) {
        if (!Array.isArray(bitDepth)) {
            bitDepth = [bitDepth];
        }
        if (!bitDepth.includes(image.depth)) {
            throw new TypeError(`The process "${processName}" can only be applied if bit depth is ${format(bitDepth)}`);
        }
    }
    if (alpha) {
        if (!Array.isArray(alpha)) {
            alpha = [alpha];
        }
        if (!alpha.includes(image.alpha)) {
            throw new TypeError(`The process "${processName}" can only be applied if alpha is ${format(alpha)}`);
        }
    }
    if (colorModel) {
        if (!Array.isArray(colorModel)) {
            colorModel = [colorModel];
        }
        if (!colorModel.includes(image.colorModel)) {
            throw new TypeError(`The process "${processName}" can only be applied if color model is ${format(colorModel)}`);
        }
    }
    if (components) {
        if (!Array.isArray(components)) {
            components = [components];
        }
        if (!components.includes(image.components)) {
            let errorMessage = `The process "${processName}" can only be applied if the number of components is ${format(components)}`;
            if (components.length === 1 && components[0] === 1) {
                throw new TypeError(`${errorMessage}.\rYou should transform your image using "image.grey()" before applying the algorithm.`);
            }
            else {
                throw new TypeError(errorMessage);
            }
        }
    }
    if (channels) {
        if (!Array.isArray(channels)) {
            channels = [channels];
        }
        if (!channels.includes(image.channels)) {
            throw new TypeError(`The process "${processName}" can only be applied if the number of channels is ${format(channels)}`);
        }
    }
}
exports.default = checkProcessable;
function format(array) {
    return formatter.format(array.map(String));
}
//# sourceMappingURL=checkProcessable.js.map