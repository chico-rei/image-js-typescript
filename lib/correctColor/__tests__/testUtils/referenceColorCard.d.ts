import { LabColor } from 'colord';
export interface ColorCardSquare {
    /**
     * Name of the color.
     */
    name: string;
    /**
     * Color of the square in the L*a*b* format.
     *   - l in range [0,100] (percents)
     *   - a and b as a value in range [-128, 127]
     *   - a is green to red and b is blue to yellow
     */
    lab: LabColor;
    /**
     * Row of the square.
     */
    row: number;
    /**
     * Color of the square.
     */
    column: number;
    /**
     * Index in the squares matrix.
     */
    index: number;
}
export type ColorCard = ColorCardSquare[];
/**
 * The color card reference values in the L*a*b* format
 */
export declare const referenceColorCard: {
    name: string;
    lab: {
        l: number;
        a: number;
        b: number;
    };
    row: number;
    column: number;
    index: number;
}[];
//# sourceMappingURL=referenceColorCard.d.ts.map