import { RoiKind } from '../../getRois';
export interface GetRainbowMapOptions {
    /**
     * Number of black ROIs
     */
    nbNegative: number;
    /**
     * Number of white ID ROIs
     */
    nbPositive: number;
    /**
     * Specify which ROIs to colour.
     *
     * @default RoiKind.BW
     */
    roiKind?: RoiKind;
}
/**
 * Return a map where ROIs are all different hues.
 *
 * @param options - Get temperature map options
 * @returns The colored map.
 */
export declare function getRainbowMap(options: GetRainbowMapOptions): Uint32Array;
//# sourceMappingURL=getRainbowMap.d.ts.map