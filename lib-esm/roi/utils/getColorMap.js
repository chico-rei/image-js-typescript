import { RoisColorMode } from '../colorRois';
import { RoiKind } from '../getRois';
import { getBinaryMap } from './colorMaps/getBinaryMap';
import { getRainbowMap } from './colorMaps/getRainbowMap';
import { getSaturationMap } from './colorMaps/getSaturationMap';
/**
 * Return a map of 32 bits integers corresponding to the colors of each ROI.
 *
 * @param options - Get color map options.
 * @returns The color map.
 */
export function getColorMap(options) {
    const { mode = RoisColorMode.BINARY } = options;
    options = { roiKind: RoiKind.BW, ...options };
    switch (mode) {
        case RoisColorMode.BINARY:
            return getBinaryMap(options);
        case RoisColorMode.SATURATION:
            return getSaturationMap(options);
        case RoisColorMode.RAINBOW:
            return getRainbowMap(options);
        default:
            throw new Error('getColorMap: unknown color mode');
    }
}
//# sourceMappingURL=getColorMap.js.map