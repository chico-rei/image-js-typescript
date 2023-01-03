import { RoiKind } from '../../getRois';
import { maxNumberRois, colorMapCenter } from '../constants';
import { hsvToRgb } from '../hsvToRgb';
import { rgbToNumber } from '../rgbToNumber';
/**
 * Return a map where ROIs are red (negative) or green (positive) depending on the ROI index.
 *
 * @param options - Color maps options.
 * @returns The colored map.
 */
export function getBinaryMap(options) {
    const { nbNegative, nbPositive, whiteHue = 120, blackHue = 0, roiKind = RoiKind.BW, } = options;
    let colorMap = new Uint32Array(maxNumberRois);
    // negative values
    if (roiKind === RoiKind.BW || roiKind === RoiKind.BLACK) {
        for (let i = colorMapCenter - nbNegative; i < colorMapCenter; i++) {
            const hsv = [blackHue, 255, 255];
            colorMap[i] = rgbToNumber(hsvToRgb(hsv));
        }
    }
    if (roiKind === RoiKind.BW || roiKind === RoiKind.WHITE) {
        // positive values
        for (let i = colorMapCenter + 1; i < colorMapCenter + 1 + nbPositive; i++) {
            const hsv = [whiteHue, 255, 255];
            colorMap[i] = rgbToNumber(hsvToRgb(hsv));
        }
    }
    return colorMap;
}
//# sourceMappingURL=getBinaryMap.js.map