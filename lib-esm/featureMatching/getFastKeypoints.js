import checkProcessable from '../utils/checkProcessable';
import { getCirclePoints, getCompassPoints } from '../utils/getCirclePoints';
import { getIndex } from '../utils/getIndex';
import { surroundingPixels } from '../utils/surroundingPixels';
import { getFastScore } from './getFastScore';
import { getHarrisScore } from './getHarrisScore';
import { isFastKeypoint } from './isFastKeypoint';
/**
 * Find the features in a GREY image according to the FAST (Features from Accelerated Segment Test) algorithm.
 * Based on the paper Machine Learning for High-Speed Corner Detection.
 * DOI: https://doi.org/10.1007/11744023_34
 *
 * @param image - The image to process.
 * @param options - Get FAST keypoints options.
 * @returns The FAST keypoints.
 */
export function getFastKeypoints(image, options = {}) {
    const { fastRadius = 3, scoreAlgorithm = 'FAST', normalizeScores = false, harrisScoreOptions, } = options;
    const circlePoints = getCirclePoints(fastRadius);
    const compassPoints = getCompassPoints(fastRadius);
    const { maxNbFeatures = 500, nbContiguousPixels = (3 / 4) * circlePoints.length, threshold = 20, nonMaxSuppression = true, } = options;
    checkProcessable(image, 'getFastKeypoints', {
        channels: [1],
        alpha: false,
    });
    const allKeypoints = [];
    let scoreArray = new Float64Array(image.size).fill(Number.NEGATIVE_INFINITY);
    for (let row = 0; row < image.height; row++) {
        for (let column = 0; column < image.width; column++) {
            const corner = { row, column };
            if (isFastKeypoint(corner, image, circlePoints, compassPoints, {
                nbContiguousPixels,
                threshold,
            })) {
                let score = 0;
                switch (scoreAlgorithm) {
                    case 'HARRIS':
                        score = getHarrisScore(image, corner, harrisScoreOptions);
                        break;
                    case 'FAST':
                        score = getFastScore(image, corner, threshold, circlePoints);
                        break;
                    default:
                        throw new Error(`getFastKeypoints: undefined score algorithm ${scoreAlgorithm}`);
                }
                scoreArray[getIndex(corner.column, corner.row, image, 0)] = score;
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
            const currentScore = scoreArray[getIndex(keypoint.origin.column, keypoint.origin.row, image, 0)];
            for (let i = 0; i < surroundingPixels.length; i++) {
                const neighbour = surroundingPixels[i];
                const neighbourScore = scoreArray[getIndex(keypoint.origin.column + neighbour.column, keypoint.origin.row + neighbour.row, image, 0)];
                if (neighbourScore > currentScore)
                    break;
                if (i === surroundingPixels.length - 1) {
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