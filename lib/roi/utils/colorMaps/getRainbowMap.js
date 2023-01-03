"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRainbowMap = void 0;
const getRois_1 = require("../../getRois");
const constants_1 = require("../constants");
const hsvToRgb_1 = require("../hsvToRgb");
const rgbToNumber_1 = require("../rgbToNumber");
/**
 * Return a map where ROIs are all different hues.
 *
 * @param options - Get temperature map options
 * @returns The colored map.
 */
function getRainbowMap(options) {
    const { nbNegative, nbPositive, roiKind = getRois_1.RoiKind.BW } = options;
    let colorMap = new Uint32Array(constants_1.maxNumberRois);
    const hueRange = 360;
    let step;
    switch (roiKind) {
        case getRois_1.RoiKind.BW: {
            step = hueRange / (nbNegative + nbPositive);
            break;
        }
        case getRois_1.RoiKind.BLACK: {
            step = hueRange / nbNegative;
            break;
        }
        case getRois_1.RoiKind.WHITE: {
            step = hueRange / nbPositive;
            break;
        }
        default: {
            throw new Error('getRainbowMap: unrecognised ROI kind');
        }
    }
    // negative values
    let hue = 0;
    if (roiKind === getRois_1.RoiKind.BW || roiKind === getRois_1.RoiKind.BLACK) {
        for (let i = constants_1.colorMapCenter - nbNegative; i < constants_1.colorMapCenter; i++) {
            const hsv = [hue, 255, 255];
            colorMap[i] = (0, rgbToNumber_1.rgbToNumber)((0, hsvToRgb_1.hsvToRgb)(hsv));
            hue += step;
        }
    }
    // positive values
    if (roiKind === getRois_1.RoiKind.BW || roiKind === getRois_1.RoiKind.WHITE) {
        for (let i = constants_1.colorMapCenter + 1; i < constants_1.colorMapCenter + 1 + nbPositive; i++) {
            const hsv = [hue, 255, 255];
            colorMap[i] = (0, rgbToNumber_1.rgbToNumber)((0, hsvToRgb_1.hsvToRgb)(hsv));
            hue += step;
        }
    }
    return colorMap;
}
exports.getRainbowMap = getRainbowMap;
//# sourceMappingURL=getRainbowMap.js.map