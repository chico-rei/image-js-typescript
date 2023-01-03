"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFastKeypoints = void 0;
const checkProcessable_1 = __importDefault(require("../utils/checkProcessable"));
const getCirclePoints_1 = require("../utils/getCirclePoints");
const getIndex_1 = require("../utils/getIndex");
const surroundingPixels_1 = require("../utils/surroundingPixels");
const getFastScore_1 = require("./getFastScore");
const getHarrisScore_1 = require("./getHarrisScore");
const isFastKeypoint_1 = require("./isFastKeypoint");
/**
 * Find the features in a GREY image according to the FAST (Features from Accelerated Segment Test) algorithm.
 * Based on the paper Machine Learning for High-Speed Corner Detection.
 * DOI: https://doi.org/10.1007/11744023_34
 *
 * @param image - The image to process.
 * @param options - Get FAST keypoints options.
 * @returns The FAST keypoints.
 */
function getFastKeypoints(image, options = {}) {
    const { fastRadius = 3, scoreAlgorithm = 'FAST', normalizeScores = false, harrisScoreOptions, } = options;
    const circlePoints = (0, getCirclePoints_1.getCirclePoints)(fastRadius);
    const compassPoints = (0, getCirclePoints_1.getCompassPoints)(fastRadius);
    const { maxNbFeatures = 500, nbContiguousPixels = (3 / 4) * circlePoints.length, threshold = 20, nonMaxSuppression = true, } = options;
    (0, checkProcessable_1.default)(image, 'getFastKeypoints', {
        channels: [1],
        alpha: false,
    });
    const allKeypoints = [];
    let scoreArray = new Float64Array(image.size).fill(Number.NEGATIVE_INFINITY);
    for (let row = 0; row < image.height; row++) {
        for (let column = 0; column < image.width; column++) {
            const corner = { row, column };
            if ((0, isFastKeypoint_1.isFastKeypoint)(corner, image, circlePoints, compassPoints, {
                nbContiguousPixels,
                threshold,
            })) {
                let score = 0;
                switch (scoreAlgorithm) {
                    case 'HARRIS':
                        score = (0, getHarrisScore_1.getHarrisScore)(image, corner, harrisScoreOptions);
                        break;
                    case 'FAST':
                        score = (0, getFastScore_1.getFastScore)(image, corner, threshold, circlePoints);
                        break;
                    default:
                        throw new Error(`getFastKeypoints: undefined score algorithm ${scoreAlgorithm}`);
                }
                scoreArray[(0, getIndex_1.getIndex)(corner.column, corner.row, image, 0)] = score;
                allKeypoints.push({ origin: corner, score });
            }
        }
    }
    let keypoints = [];
    if (!nonMaxSuppression) {
        keypoints = allKeypoints;
    }
    else {
        // Non-Maximal Suppression
        for (let keypoint of allKeypoints) {
            const currentScore = scoreArray[(0, getIndex_1.getIndex)(keypoint.origin.column, keypoint.origin.row, image, 0)];
            for (let i = 0; i < surroundingPixels_1.surroundingPixels.length; i++) {
                const neighbour = surroundingPixels_1.surroundingPixels[i];
                const neighbourScore = scoreArray[(0, getIndex_1.getIndex)(keypoint.origin.column + neighbour.column, keypoint.origin.row + neighbour.row, image, 0)];
                if (neighbourScore > currentScore)
                    break;
                if (i === surroundingPixels_1.surroundingPixels.length - 1) {
                    keypoints.push(keypoint);
                }
            }
        }
    }
    keypoints.sort((a, b) => b.score - a.score);
    if (normalizeScores) {
        keypoints = getNormalizedKeypoints(keypoints);
    }
    return keypoints.slice(0, maxNbFeatures);
}
exports.getFastKeypoints = getFastKeypoints;
/**
 * Normalizes the keypoints scores, the best keypoint having a score of 1 and the worst a score of 0.
 *
 * @param keypoints - The keypoints to process.
 * @returns Keypoints with normalized scores.
 */
function getNormalizedKeypoints(keypoints) {
    const minValue = keypoints[keypoints.length - 1].score;
    const maxValue = keypoints[0].score;
    const scoreRange = maxValue - minValue;
    for (let keypoint of keypoints) {
        keypoint.score = (keypoint.score - minValue) / scoreRange;
    }
    return keypoints;
}
//# sourceMappingURL=getFastKeypoints.js.map