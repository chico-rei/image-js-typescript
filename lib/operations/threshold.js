"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.threshold = exports.computeThreshold = exports.ThresholdAlgorithm = void 0;
const getOutputImage_1 = require("../utils/getOutputImage");
const validators_1 = require("../utils/validators");
const huang_1 = __importDefault(require("./thresholds/huang"));
const intermodes_1 = __importDefault(require("./thresholds/intermodes"));
const isodata_1 = __importDefault(require("./thresholds/isodata"));
const li_1 = __importDefault(require("./thresholds/li"));
const maxEntropy_1 = __importDefault(require("./thresholds/maxEntropy"));
const mean_1 = __importDefault(require("./thresholds/mean"));
const minError_1 = __importDefault(require("./thresholds/minError"));
const minimum_1 = __importDefault(require("./thresholds/minimum"));
const moments_1 = __importDefault(require("./thresholds/moments"));
const otsu_1 = require("./thresholds/otsu");
const percentile_1 = __importDefault(require("./thresholds/percentile"));
const renyiEntropy_1 = __importDefault(require("./thresholds/renyiEntropy"));
const shanbhag_1 = __importDefault(require("./thresholds/shanbhag"));
const triangle_1 = require("./thresholds/triangle");
const yen_1 = __importDefault(require("./thresholds/yen"));
var ThresholdAlgorithm;
(function (ThresholdAlgorithm) {
    ThresholdAlgorithm["HUANG"] = "HUANG";
    ThresholdAlgorithm["INTERMODES"] = "INTERMODES";
    ThresholdAlgorithm["ISODATA"] = "ISODATA";
    ThresholdAlgorithm["LI"] = "LI";
    ThresholdAlgorithm["MAX_ENTROPY"] = "MAX_ENTROPY";
    ThresholdAlgorithm["MEAN"] = "MEAN";
    ThresholdAlgorithm["MIN_ERROR"] = "MIN_ERROR";
    ThresholdAlgorithm["MINIMUM"] = "MINIMUM";
    ThresholdAlgorithm["MOMENTS"] = "MOMENTS";
    ThresholdAlgorithm["OTSU"] = "OTSU";
    ThresholdAlgorithm["PERCENTILE"] = "PERCENTILE";
    ThresholdAlgorithm["RENYI_ENTROPY"] = "RENYI_ENTROPY";
    ThresholdAlgorithm["SHANBHAG"] = "SHANBHAG";
    ThresholdAlgorithm["TRIANGLE"] = "TRIANGLE";
    ThresholdAlgorithm["YEN"] = "YEN";
})(ThresholdAlgorithm = exports.ThresholdAlgorithm || (exports.ThresholdAlgorithm = {}));
/**
 * Compute threshold value for an image using the specified algorithm.
 *
 * @param image - The grey image.
 * @param algorithm - Algorithm that defines the threshold.
 * @returns The threshold value for the image.
 */
function computeThreshold(image, algorithm = ThresholdAlgorithm.OTSU) {
    if (image.channels !== 1) {
        throw new Error('threshold can only be computed on images with one channel');
    }
    const histogram = image.histogram();
    switch (algorithm) {
        case ThresholdAlgorithm.HUANG:
            return (0, huang_1.default)(histogram);
        case ThresholdAlgorithm.INTERMODES:
            return (0, intermodes_1.default)(histogram);
        case ThresholdAlgorithm.ISODATA:
            return (0, isodata_1.default)(histogram);
        case ThresholdAlgorithm.LI:
            return (0, li_1.default)(histogram, image.size);
        case ThresholdAlgorithm.MAX_ENTROPY:
            return (0, maxEntropy_1.default)(histogram, image.size);
        case ThresholdAlgorithm.MEAN:
            return (0, mean_1.default)(histogram, image.size);
        case ThresholdAlgorithm.MINIMUM:
            return (0, minimum_1.default)(histogram);
        case ThresholdAlgorithm.MIN_ERROR:
            return (0, minError_1.default)(histogram, image.size);
        case ThresholdAlgorithm.MOMENTS:
            return (0, moments_1.default)(histogram, image.size);
        case ThresholdAlgorithm.OTSU:
            return (0, otsu_1.otsu)(histogram, image.size);
        case ThresholdAlgorithm.PERCENTILE:
            return (0, percentile_1.default)(histogram);
        case ThresholdAlgorithm.RENYI_ENTROPY:
            return (0, renyiEntropy_1.default)(histogram, image.size);
        case ThresholdAlgorithm.SHANBHAG:
            return (0, shanbhag_1.default)(histogram, image.size);
        case ThresholdAlgorithm.TRIANGLE:
            return (0, triangle_1.triangle)(histogram);
        case ThresholdAlgorithm.YEN:
            return (0, yen_1.default)(histogram, image.size);
        default:
            throw new RangeError(`unsupported threshold algorithm: ${algorithm}`);
    }
}
exports.computeThreshold = computeThreshold;
// See: https://docs.opencv.org/4.0.1/d7/d1b/group__imgproc__misc.html#gaa9e58d2860d4afa658ef70a9b1115576
/**
 * Create a black and white image based on a threshold value.
 *
 * @param image - The grey image to convert.
 * @param options - Threshold options.
 * @returns The resulting mask.
 */
function threshold(image, options = {}) {
    let thresholdValue;
    if ('threshold' in options) {
        const threshold = options.threshold;
        if (typeof threshold === 'number') {
            thresholdValue = threshold;
        }
        else if (typeof threshold === 'string' &&
            threshold.endsWith('%') &&
            !Number.isNaN(Number(threshold.slice(0, -1)))) {
            const percents = Number(threshold.slice(0, -1));
            if (percents < 0 || percents > 100) {
                throw new RangeError('threshold: threshold in percents is out of range 0 to 100');
            }
            thresholdValue = (percents / 100) * image.maxValue;
        }
        else {
            throw new Error('threshold: unrecognised threshold format');
        }
    }
    else {
        thresholdValue = computeThreshold(image, options.algorithm);
    }
    (0, validators_1.validateValue)(thresholdValue, image);
    const result = (0, getOutputImage_1.imageToOutputMask)(image, options);
    for (let i = 0; i < image.size; i++) {
        result.setBitByIndex(i, image.getValueByIndex(i, 0) > thresholdValue ? 1 : 0);
    }
    return result;
}
exports.threshold = threshold;
//# sourceMappingURL=threshold.js.map