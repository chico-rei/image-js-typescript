import { Image } from '..';
import { RoiKind } from './getRois';
import { RoiMapManager } from '.';
export declare enum RoisColorMode {
    /**
     * Only two acceptable values: red or green
     */
    BINARY = "BINARY",
    /**
     * Palette of reds and blues.
     */
    SATURATION = "SATURATION",
    /**
     * All possible hues (gradient of colors).
     */
    RAINBOW = "RAINBOW"
}
export interface ColorRoisOptions {
    /**
     * Define the color mode to use to color the ROIs.
     *
     * @default ColorMode.BINARY
     */
    mode?: RoisColorMode;
    /**
     * Specify which ROIs to colour.
     *
     * @default RoiKind.BW
     */
    roiKind?: RoiKind;
}
/**
 * Generate an image with all the ROIs of various colors.
 *
 * @param roiMapManager - The ROI map manager.
 * @param options - Color ROIs options.
 * @returns The colored image.
 */
export declare function colorRois(roiMapManager: RoiMapManager, options?: ColorRoisOptions): Image;
//# sourceMappingURL=colorRois.d.ts.map