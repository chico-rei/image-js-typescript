"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.median = void 0;
// @ts-expect-error: median-quisckselect has no types
const median_quickselect_1 = __importDefault(require("median-quickselect"));
/**
 * Returns the median pixel of the image. The median is computed on each channel individually.
 *
 * @param image - Image to process.
 * @returns Median pixel.
 */
function median(image) {
    let pixel = new Array(image.channels).fill(0);
    for (let i = 0; i < image.channels; i++) {
        const channel = image.getChannel(i);
        pixel[i] = (0, median_quickselect_1.default)(channel);
    }
    return pixel;
}
exports.median = median;
//# sourceMappingURL=median.js.map