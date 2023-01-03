import { RoiKind } from '../../getRois';
import { maxNumberRois, colorMapCenter } from '../constants';
import { hsvToRgb } from '../hsvToRgb';
import { rgbToNumber } from '../rgbToNumber';
/**
 * Return a map where ROIs are all different hues.
 *
 * @param options - Get temperature map options
 * @returns The colored map.
 */
export function getRainbowMap(options) {
    const { nbNegative, nbPositive, roiKind = RoiKind.BW } = options;
    let colorMap = new Uint32Array(maxNumberRois);
    const hueRange = 360;
    let step;
    switch (roiKind) {
        case RoiKind.BW: {
            step = hueRange / (nbNegative + nbPositive);
            break;
        }
        case RoiKind.BLACK: {
            step = hueRange / nbNegative;
            break;
        }
        case RoiKind.WHITE: {
            step = hueRange / nbPositive;
            break;
        }
        default: {
            throw new Error('getRainbowMap: unrecognised ROI kind');
        }
    }
    // negative values
    let hue = 0;
    if (roiKind === RoiKind.BW || roiKind === RoiKind.BLACK) {
        for (let i = colorMapCenter - nbNegative; i < colorMapCenter; i++) {
            const hsv = [hue, 255, 255];
            colorMap[i] = rgbToNumber(hsvToRgb(hsv));
            hue += step;
        }
    }
    // positive values
    if (roiKind === RoiKind.BW || roiKind === RoiKind.WHITE) {
        for (let i = colorMapCenter + 1; i < colorMapCenter + 1 + nbPositive; i++) {
            const hsv = [hue, 255, 255];
            colorMap[i] = rgbToNumber(hsvToRgb(hsv));
            hue += step;
        }
    }
    return colorMap;
}
//# sourceMappingURL=getRainbowMap.js.map