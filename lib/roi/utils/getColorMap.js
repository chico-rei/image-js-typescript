"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColorMap = void 0;
const colorRois_1 = require("../colorRois");
const getRois_1 = require("../getRois");
const getBinaryMap_1 = require("./colorMaps/getBinaryMap");
const getRainbowMap_1 = require("./colorMaps/getRainbowMap");
const getSaturationMap_1 = require("./colorMaps/getSaturationMap");
/**
 * Return a map of 32 bits integers corresponding to the colors of each ROI.
 *
 * @param options - Get color map options.
 * @returns The color map.
 */
function getColorMap(options) {
    const { mode = colorRois_1.RoisColorMode.BINARY } = options;
    options = { roiKind: getRois_1.RoiKind.BW, ...options };
    switch (mode) {
        case colorRois_1.RoisColorMode.BINARY:
            return (0, getBinaryMap_1.getBinaryMap)(options);
        case colorRois_1.RoisColorMode.SATURATION:
            return (0, getSaturationMap_1.getSaturationMap)(options);
        case colorRois_1.RoisColorMode.RAINBOW:
            return (0, getRainbowMap_1.getRainbowMap)(options);
        default:
            throw new Error('getColorMap: unknown color mode');
    }
}
exports.getColorMap = getColorMap;
//# sourceMappingURL=getColorMap.js.map