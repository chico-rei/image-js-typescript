import { imageToOutputMask } from '../utils/getOutputImage';
import { validateValue } from '../utils/validators';
import huang from './thresholds/huang';
import intermodes from './thresholds/intermodes';
import isodata from './thresholds/isodata';
import li from './thresholds/li';
import maxEntropy from './thresholds/maxEntropy';
import mean from './thresholds/mean';
import minError from './thresholds/minError';
import minimum from './thresholds/minimum';
import moments from './thresholds/moments';
import { otsu } from './thresholds/otsu';
import percentile from './thresholds/percentile';
import renyiEntropy from './thresholds/renyiEntropy';
import shanbhag from './thresholds/shanbhag';
import { triangle } from './thresholds/triangle';
import yen from './thresholds/yen';
export var ThresholdAlgorithm;
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
})(ThresholdAlgorithm || (ThresholdAlgorithm = {}));
/**
 * Compute threshold value for an image using the specified algorithm.
 *
 * @param image - The grey image.
 * @param algorithm - Algorithm that defines the threshold.
 * @returns The threshold value for the image.
 */
export function computeThreshold(image, algorithm = ThresholdAlgorithm.OTSU) {
    if (image.channels !== 1) {
        throw new Error('threshold can only be computed on images with one channel');
    }
    const histogram = image.histogram();
    switch (algorithm) {
        case ThresholdAlgorithm.HUANG:
            return huang(histogram);
        case ThresholdAlgorithm.INTERMODES:
            return intermodes(histogram);
        case ThresholdAlgorithm.ISODATA:
            return isodata(histogram);
        case ThresholdAlgorithm.LI:
            return li(histogram, image.size);
        case ThresholdAlgorithm.MAX_ENTROPY:
            return maxEntropy(histogram, image.size);
        case ThresholdAlgorithm.MEAN:
            return mean(histogram, image.size);
        case ThresholdAlgorithm.MINIMUM:
            return minimum(histogram);
        case ThresholdAlgorithm.MIN_ERROR:
            return minError(histogram, image.size);
        case ThresholdAlgorithm.MOMENTS:
            return moments(histogram, image.size);
        case ThresholdAlgorithm.OTSU:
            return otsu(histogram, image.size);
        case ThresholdAlgorithm.PERCENTILE:
            return percentile(histogram);
        case ThresholdAlgorithm.RENYI_ENTROPY:
            return renyiEntropy(histogram, image.size);
        case ThresholdAlgorithm.SHANBHAG:
            return shanbhag(histogram, image.size);
        case ThresholdAlgorithm.TRIANGLE:
            return triangle(histogram);
        case ThresholdAlgorithm.YEN:
            return yen(histogram, image.size);
        default:
            throw new RangeError(`unsupported threshold algorithm: ${algorithm}`);
    }
}
// See: https://docs.opencv.org/4.0.1/d7/d1b/group__imgproc__misc.html#gaa9e58d2860d4afa658ef70a9b1115576
/**
 * Create a black and white image based on a threshold value.
 *
 * @param image - The grey image to convert.
 * @param options - Threshold options.
 * @returns The resulting mask.
 */
export function threshold(image, options = {}) {
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
    validateValue(thresholdValue, image);
    const result = imageToOutputMask(image, options);
    for (let i = 0; i < image.size; i++) {
        result.setBitByIndex(i, image.getValueByIndex(i, 0) > thresholdValue ? 1 : 0);
    }
    return result;
}
//# sourceMappingURL=threshold.js.map