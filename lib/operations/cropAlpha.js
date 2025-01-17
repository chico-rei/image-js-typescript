"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cropAlpha = void 0;
const checkProcessable_1 = __importDefault(require("../utils/checkProcessable"));
/**
 * Crops the image based on the alpha channel
 * This removes lines and columns where the alpha channel is lower than a threshold value.
 *
 * @param image - Image to process.
 * @param options - Crop alpha options.
 * @returns The cropped image.
 */
function cropAlpha(image, options = {}) {
    (0, checkProcessable_1.default)(image, 'cropAlpha', {
        alpha: true,
    });
    const { threshold = image.maxValue } = options;
    let left = findLeft(image, threshold, image.components);
    if (left === -1) {
        throw new Error('Could not find new dimensions. Threshold may be too high.');
    }
    let top = findTop(image, threshold, image.components, left);
    let bottom = findBottom(image, threshold, image.components, left);
    let right = findRight(image, threshold, image.components, left, top, bottom);
    return image.crop({
        origin: { column: left, row: top },
        width: right - left + 1,
        height: bottom - top + 1,
    });
}
exports.cropAlpha = cropAlpha;
function findLeft(image, threshold, channel) {
    for (let row = 0; row < image.width; row++) {
        for (let column = 0; column < image.height; column++) {
            if (image.getValue(row, column, channel) >= threshold) {
                return row;
            }
        }
    }
    return -1;
}
function findTop(image, threshold, channel, left) {
    for (let row = 0; row < image.height; row++) {
        for (let column = left; column < image.width; column++) {
            if (image.getValue(column, row, channel) >= threshold) {
                return row;
            }
        }
    }
    /* istanbul ignore next */
    return -1;
}
function findBottom(image, threshold, channel, left) {
    for (let row = image.height - 1; row >= 0; row--) {
        for (let column = left; column < image.width; column++) {
            if (image.getValue(column, row, channel) >= threshold) {
                return row;
            }
        }
    }
    /* istanbul ignore next */
    return -1;
}
function findRight(image, threshold, channel, left, top, bottom) {
    for (let row = image.width - 1; row >= left; row--) {
        for (let column = top; column <= bottom; column++) {
            if (image.getValue(row, column, channel) >= threshold) {
                return row;
            }
        }
    }
    /* istanbul ignore next */
    return -1;
}
//# sourceMappingURL=cropAlpha.js.map