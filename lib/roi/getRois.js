"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRois = exports.RoiKind = void 0;
const computeRois_1 = require("./computeRois");
var RoiKind;
(function (RoiKind) {
    RoiKind["BLACK"] = "BLACK";
    RoiKind["WHITE"] = "WHITE";
    RoiKind["BW"] = "BW";
})(RoiKind = exports.RoiKind || (exports.RoiKind = {}));
/**
 * Return an array of ROIs matching the options.
 *
 * @param roiMapManager - The ROI map manager containing the ROIs
 * @param options - Get ROIs options.
 * @returns The array of ROIs.
 */
function getRois(roiMapManager, options = {}) {
    const { minSurface = 0, maxSurface = Number.MAX_SAFE_INTEGER, kind = 'WHITE', } = options;
    if (roiMapManager.blackRois.length === 0 &&
        roiMapManager.whiteRois.length === 0) {
        (0, computeRois_1.computeRois)(roiMapManager);
    }
    let rois;
    switch (kind) {
        case RoiKind.BLACK: {
            rois = roiMapManager.blackRois;
            break;
        }
        case RoiKind.WHITE: {
            rois = roiMapManager.whiteRois;
            break;
        }
        case RoiKind.BW: {
            rois = [...roiMapManager.whiteRois, ...roiMapManager.blackRois];
            break;
        }
        default: {
            throw new Error('getRois: unknown ROI kind');
        }
    }
    return rois.filter((roi) => roi.surface >= minSurface && roi.surface <= maxSurface);
}
exports.getRois = getRois;
//# sourceMappingURL=getRois.js.map