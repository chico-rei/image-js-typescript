"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSaturationMap = void 0;
const getRois_1 = require("../../getRois");
const constants_1 = require("../constants");
const hsvToRgb_1 = require("../hsvToRgb");
const rgbToNumber_1 = require("../rgbToNumber");
/**
 * Return a map where ROIs are different shades of red (positive) or blue (negative) depending on the ROI index. It it the saturation of the HSV color model that is varied.
 *
 * @param options - Get temperature map options
 * @returns The colored map.
 */
function getSaturationMap(options) {
    const { nbNegative, nbPositive, roiKind = getRois_1.RoiKind.BW, whiteHue = 0, blackHue = 240, } = options;
    let colorMap = new Uint32Array(constants_1.maxNumberRois);
    const range = 255 - 63; // saturation range for good contrast
    const negativeStep = range / nbNegative;
    const positiveStep = range / nbPositive;
    // negative values
    let counter = 0;
    if (roiKind === getRois_1.RoiKind.BW || roiKind === getRois_1.RoiKind.BLACK) {
        for (let i = constants_1.colorMapCenter - nbNegative; i < constants_1.colorMapCenter; i++) {
            const hsv = [blackHue, 255 - counter++ * negativeStep, 255];
            colorMap[i] = (0, rgbToNumber_1.rgbToNumber)((0, hsvToRgb_1.hsvToRgb)(hsv));
        }
    }
    // positive values
    counter = 0;
    if (roiKind === getRois_1.RoiKind.BW || roiKind === getRois_1.RoiKind.WHITE) {
        for (let i = constants_1.colorMapCenter + 1; i < constants_1.colorMapCenter + 1 + nbPositive; i++) {
            const hsv = [whiteHue, 255 - counter++ * positiveStep, 255];
            colorMap[i] = (0, rgbToNumber_1.rgbToNumber)((0, hsvToRgb_1.hsvToRgb)(hsv));
        }
    }
    return colorMap;
}
exports.getSaturationMap = getSaturationMap;
//# sourceMappingURL=getSaturationMap.js.map