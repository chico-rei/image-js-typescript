"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrientedFastKeypoints = void 0;
const getAngle_1 = require("../maskAnalysis/utils/getAngle");
const angles_1 = require("../utils/geometry/angles");
const getFastKeypoints_1 = require("./getFastKeypoints");
const getIntensityCentroid_1 = require("./getIntensityCentroid");
/**
 * Find the oriented FAST features in a GREY image.
 * How to add orientation to FAST is described in: http://www.gwylab.com/download/ORB_2012.pdf
 * Basically, the intensity centroid of the window around the corner is computed and the
 * orientation is given by the vector from the center to the intensity centroid.
 *
 * @param image - The image to process.
 * @param options - Get oriented FAST keypoints options.
 * @returns The oriented FAST keypoints.
 */
function getOrientedFastKeypoints(image, options = {}) {
    const { windowSize = 7 } = options;
    const fastKeypoints = (0, getFastKeypoints_1.getFastKeypoints)(image, options);
    const borderDistance = (windowSize - 1) / 2;
    // handle edge cases: remove keypoints too close to border
    for (let i = 0; i < fastKeypoints.length; i++) {
        if (fastKeypoints[i].origin.column < borderDistance ||
            fastKeypoints[i].origin.row < borderDistance) {
            fastKeypoints.splice(i, 1);
        }
    }
    let orientedFastKeypoints = [];
    for (let keypoint of fastKeypoints) {
        const cropOrigin = {
            row: keypoint.origin.row - borderDistance,
            column: keypoint.origin.column - borderDistance,
        };
        const window = image.crop({
            origin: cropOrigin,
            width: windowSize,
            height: windowSize,
        });
        const centroid = (0, getIntensityCentroid_1.getIntensityCentroid)(window)[0];
        const angle = (0, angles_1.toDegrees)((0, getAngle_1.getAngle)({ column: 0, row: 0 }, centroid));
        orientedFastKeypoints.push({ ...keypoint, angle });
    }
    return orientedFastKeypoints;
}
exports.getOrientedFastKeypoints = getOrientedFastKeypoints;
//# sourceMappingURL=getOrientedFastKeypoints.js.map