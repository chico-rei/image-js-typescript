"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBinaryMap = void 0;
const getRois_1 = require("../../getRois");
const constants_1 = require("../constants");
const hsvToRgb_1 = require("../hsvToRgb");
const rgbToNumber_1 = require("../rgbToNumber");
/**
 * Return a map where ROIs are red (negative) or green (positive) depending on the ROI index.
 *
 * @param options - Color maps options.
 * @returns The colored map.
 */
function getBinaryMap(options) {
    const { nbNegative, nbPositive, whiteHue = 120, blackHue = 0, roiKind = getRois_1.RoiKind.BW, } = options;
    let colorMap = new Uint32Array(constants_1.maxNumberRois);
    // negative values
    if (roiKind === getRois_1.RoiKind.BW || roiKind === getRois_1.RoiKind.BLACK) {
        for (let i = constants_1.colorMapCenter - nbNegative; i < constants_1.colorMapCenter; i++) {
            const hsv = [blackHue, 255, 255];
            colorMap[i] = (0, rgbToNumber_1.rgbToNumber)((0, hsvToRgb_1.hsvToRgb)(hsv));
        }
    }
    if (roiKind === getRois_1.RoiKind.BW || roiKind === getRois_1.RoiKind.WHITE) {
        // positive values
        for (let i = constants_1.colorMapCenter + 1; i < constants_1.colorMapCenter + 1 + nbPositive; i++) {
            const hsv = [whiteHue, 255, 255];
            colorMap[i] = (0, rgbToNumber_1.rgbToNumber)((0, hsvToRgb_1.hsvToRgb)(hsv));
        }
    }
    return colorMap;
}
exports.getBinaryMap = getBinaryMap;
//# sourceMappingURL=getBinaryMap.js.map