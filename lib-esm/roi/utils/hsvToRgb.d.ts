export interface HsvColor {
    h: number;
    s: number;
    v: number;
}
export interface RgbColor {
    r: number;
    g: number;
    b: number;
}
/**
 * Convert HSV (hue, saturation, value) color code to RGB.
 * - Hue: angle in the color wheel (from red to purple), in range 0->359
 * - Saturation: how strong the color is (from white to bright color), in range 0-255
 * - Value: basically the brightness (from black to intense color), in range 0-255
 *
 * @param hsv - The HSV color.
 * @returns The RGB color.
 */
export declare function hsvToRgb(hsv: number[]): Uint8Array;
//# sourceMappingURL=hsvToRgb.d.ts.map