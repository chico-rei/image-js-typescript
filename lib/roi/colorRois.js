"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorRois = exports.RoisColorMode = void 0;
const __1 = require("..");
const getRois_1 = require("./getRois");
const constants_1 = require("./utils/constants");
const getColorMap_1 = require("./utils/getColorMap");
var RoisColorMode;
(function (RoisColorMode) {
    /**
     * Only two acceptable values: red or green
     */
    RoisColorMode["BINARY"] = "BINARY";
    /**
     * Palette of reds and blues.
     */
    RoisColorMode["SATURATION"] = "SATURATION";
    /**
     * All possible hues (gradient of colors).
     */
    RoisColorMode["RAINBOW"] = "RAINBOW";
})(RoisColorMode = exports.RoisColorMode || (exports.RoisColorMode = {}));
/**
 * Generate an image with all the ROIs of various colors.
 *
 * @param roiMapManager - The ROI map manager.
 * @param options - Color ROIs options.
 * @returns The colored image.
 */
function colorRois(roiMapManager, options = {}) {
    const { roiKind = getRois_1.RoiKind.BW, mode = RoisColorMode.BINARY } = options;
    const map = roiMapManager.getMap();
    let image = new __1.Image(map.width, map.height, {
        colorModel: __1.ImageColorModel.RGBA,
    });
    const colorMap = (0, getColorMap_1.getColorMap)({
        roiKind,
        mode,
        nbNegative: map.nbNegative,
        nbPositive: map.nbPositive,
    });
    let data32 = new Uint32Array(image.getRawImage().data.buffer);
    for (let index = 0; index < image.size; index++) {
        data32[index] = colorMap[map.data[index] + constants_1.colorMapCenter];
    }
    return image;
}
exports.colorRois = colorRois;
//# sourceMappingURL=colorRois.js.map