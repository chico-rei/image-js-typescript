import { Image, ImageColorModel } from '..';
import { RoiKind } from './getRois';
import { colorMapCenter } from './utils/constants';
import { getColorMap } from './utils/getColorMap';
export var RoisColorMode;
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
})(RoisColorMode || (RoisColorMode = {}));
/**
 * Generate an image with all the ROIs of various colors.
 *
 * @param roiMapManager - The ROI map manager.
 * @param options - Color ROIs options.
 * @returns The colored image.
 */
export function colorRois(roiMapManager, options = {}) {
    const { roiKind = RoiKind.BW, mode = RoisColorMode.BINARY } = options;
    const map = roiMapManager.getMap();
    let image = new Image(map.width, map.height, {
        colorModel: ImageColorModel.RGBA,
    });
    const colorMap = getColorMap({
        roiKind,
        mode,
        nbNegative: map.nbNegative,
        nbPositive: map.nbPositive,
    });
    let data32 = new Uint32Array(image.getRawImage().data.buffer);
    for (let index = 0; index < image.size; index++) {
        data32[index] = colorMap[map.data[index] + colorMapCenter];
    }
    return image;
}
//# sourceMappingURL=colorRois.js.map