import { ColorDepth, Image, ImageColorModel } from './Image';
import { SubtractImageOptions } from './compare';
import { DrawLineOnMaskOptions, DrawPolygonOnMaskOptions, DrawPolylineOnMaskOptions, DrawRectangleOptions } from './draw';
import { DrawPointsOptions } from './draw/drawPoints';
import { AndOptions, InvertOptions, OrOptions } from './filters';
import { GetBorderPointsOptions, ConvexHull, Feret } from './maskAnalysis';
import { Mbr } from './maskAnalysis/getMbr';
import { BottomHatOptions, ClearBorderOptions, CloseOptions, DilateOptions, ErodeOptions, FloodFillOptions, MorphologicalGradientOptions, OpenOptions, SolidFillOptions, TopHatOptions } from './morphology';
import { CopyToOptions, PaintMaskOnMaskOptions } from './operations';
import { Point } from './utils/geometry/points';
export type BitValue = 1 | 0 | boolean;
export interface MaskOptions {
    /**
     * Origin of the image relative to a parent image.
     *
     * @default {row: 0, column: 0}
     */
    origin?: Point;
    /**
     * Typed array holding the mask data.
     */
    data?: Uint8Array;
}
export interface MaskCreateFromOptions extends MaskOptions {
    width?: number;
    height?: number;
}
export declare class Mask {
    /**
     * The number of columns of the mask.
     */
    readonly width: number;
    /**
     * The number of rows of the mask.
     */
    readonly height: number;
    /**
     * The total number of bits in the mask (width × height).
     */
    readonly size: number;
    /**
     * The number of bits per value in each channel (always 1).
     */
    readonly depth: ColorDepth;
    /**
     * The color model of the mask (always BINARY).
     */
    readonly colorModel: ImageColorModel;
    /**
     * The number of color channels in the image, excluding the alpha channel.
     * (always 1)
     */
    readonly components: number;
    /**
     * The number of channels in the mask, including the alpha channel.
     * (always 1)
     */
    readonly channels: number;
    /**
     * Specifying that the mask has no an alpha channel.
     */
    readonly alpha: boolean;
    /**
     * The maximum value that a pixel channel can have.
     */
    readonly maxValue: number;
    /**
     * Origin of the image relative to a the parent image.
     */
    readonly origin: Point;
    /**
     * Typed array holding the mask data.
     */
    private readonly data;
    /**
     * Construct a new Mask knowing its dimensions.
     *
     * @param width - Image width.
     * @param height - Image height.
     * @param options - Image options.
     */
    constructor(width: number, height: number, options?: MaskOptions);
    /**
     * Create a new Mask based on the properties of an existing one.
     *
     * @param other - Reference Mask.
     * @param options - Mask options.
     * @returns New mask.
     */
    static createFrom(other: Mask | Image, options?: MaskCreateFromOptions): Mask;
    /**
     * Geta pixel of the mask.
     *
     * @param column - Column index.
     * @param row - Row index.
     * @returns The pixel.
     */
    getPixel(column: number, row: number): number[];
    /**
     * Set a pixel.
     *
     * @param column - Column index.
     * @param row - Row index.
     * @param value - The pixelvalue.
     */
    setPixel(column: number, row: number, value: number[]): void;
    /**
     * Set a pixel to a given value if the coordinates are inside the mask.
     *
     * @param column - Column index.
     * @param row - Row index.
     * @param value - New color of the pixel to set.
     */
    setVisiblePixel(column: number, row: number, value: number[]): void;
    /**
     * Get a pixel using its index.
     *
     * @param index - Index of the pixel.
     * @returns The pixel.
     */
    getPixelByIndex(index: number): number[];
    /**
     * Set a pixel using its index.
     *
     * @param index - Index of the pixel.
     * @param value - Newvalue of the pixel to set.
     */
    setPixelByIndex(index: number, value: number[]): void;
    /**
     * Create a mask from an array of points.
     *
     * @param width - Width of the mask.
     * @param height - Height of the mask.
     * @param points - Reference Mask.
     * @returns New mask.
     */
    static fromPoints(width: number, height: number, points: Point[]): Mask;
    /**
     * Create a copy of this mask.
     *
     * @returns The mask clone.
     */
    clone(): Mask;
    /**
     * Get the value of a bit.
     *
     * @param column - Column index.
     * @param row - Row index.
     * @returns The bit value.
     */
    getBit(column: number, row: number): number;
    /**
     * Set the value of a bit.
     *
     * @param column - Column index.
     * @param row - Row index.
     * @param value - New bit value.
     */
    setBit(column: number, row: number, value: BitValue): void;
    /**
     * Get the value of a bit using index.
     *
     * @param index - Index of the pixel.
     * @returns Value of the bit.
     */
    getBitByIndex(index: number): number;
    /**
     * Set the value of a bit using index.
     *
     * @param index - Index of the pixel.
     * @param value - Value to set.
     */
    setBitByIndex(index: number, value: BitValue): void;
    /**
     * Get the value of a bit. Function exists for compatibility with Image.
     *
     * @param column - Column index.
     * @param row - Row index.
     * @param channel - Index of the channel, must be zero.
     * @returns The bit value.
     */
    getValue(column: number, row: number, channel: number): number;
    /**
     * Set the value of a bit. Function exists for compatibility with Image.
     *
     * @param column - Column index.
     * @param row - Row index.
     * @param channel - Index of the channel, must be zero.
     * @param value - New bit value.
     */
    setValue(column: number, row: number, channel: number, value: BitValue): void;
    /**
     * Get the value of a bit using index. Function exists for compatibility with Image.
     *
     * @param index - Index of the pixel.
     * @param channel - Index of the channel, must be zero.
     * @returns Value of the bit.
     */
    getValueByIndex(index: number, channel: number): number;
    /**
     * Set the value of a bit using index. Function exists for compatibility with Image.
     *
     * @param index - Index of the pixel.
     * @param channel - Index of the channel, must be zero.
     * @param value - Value to set.
     */
    setValueByIndex(index: number, channel: number, value: BitValue): void;
    /**
     * Get the value of a specific bit. Select bit using a point.
     *
     * @param point - Coordinates of the desired biz.
     * @returns Value of the bit.
     */
    getValueByPoint(point: Point): number;
    /**
     * Set the value of a specific bit. Select bit using a point.
     *
     * @param point - Coordinates of the bit.
     * @param value - Value to set.
     */
    setValueByPoint(point: Point, value: BitValue): void;
    /**
     * Return the raw mask data.
     *
     * @returns The raw data.
     */
    getRawImage(): {
        width: number;
        height: number;
        data: Uint8Array;
    };
    /**
     * Fill the mask with a value.
     *
     * @param value - Value of the bit.
     * @returns The mask instance.
     */
    fill(value: BitValue): this;
    convertColor(colorModel: ImageColorModel): Image;
    /**
     * Invert the colors of the mask.
     *
     * @param options - Inversion options
     * @returns The inverted mask.
     */
    invert(options?: InvertOptions): Mask;
    /**
     * Subtract other from a mask.
     *
     * @param other - Image to subtract
     * @param options - Inversion options
     * @returns The subtracted mask.
     */
    subtract(other: Mask, options?: SubtractImageOptions): Mask;
    /**
     * Perform an AND operation on two masks.
     *
     * @param other - Second mask.
     * @param options - And options.
     * @returns AND of the two masks.
     */
    and(other: Mask, options?: AndOptions): Mask;
    /**
     * Perform an OR operation on two masks.
     *
     * @param other - Second mask.
     * @param options - And options.
     * @returns OR of the two masks.
     */
    or(other: Mask, options?: OrOptions): Mask;
    /**
     * Get the coordinates of the points on the border of a shape defined in a mask.
     *
     * @param options - Get border points options.
     * @returns Array of boder points.
     */
    getBorderPoints(options?: GetBorderPointsOptions): Point[];
    /**
     * Get the vertices of the convex Hull polygon of a mask.
     *
     * @returns Array of the vertices of the convex Hull in clockwise order.
     */
    getConvexHull(): ConvexHull;
    /**
     * Get the corners of the minimum bounding rectangle of a shape defined in a mask.
     *
     * @returns Array of boder points.
     */
    getMbr(): Mbr;
    /**
     * Computes the Feret data.
     *
     * @returns The Feret diameters.
     */
    getFeret(): Feret;
    /**
     * Erode a Mask.
     *
     * @param options - Erode options
     * @returns The eroded mask.
     */
    erode(options?: ErodeOptions): Mask;
    /**
     * Dilate an image.
     *
     * @param options - Dilate options.
     * @returns The dilated image.
     */
    dilate(options?: DilateOptions): Mask;
    /**
     * Open an image.
     *
     * @param options - Open options.
     * @returns The opened image.
     */
    open(options?: OpenOptions): Mask;
    /**
     * Close an image.
     *
     * @param options - Close options.
     * @returns The closed image.
     */
    close(options?: CloseOptions): Mask;
    /**
     * Top hat of an image.
     *
     * @param options - Top hat options.
     * @returns The top-hatted image.
     */
    topHat(options?: TopHatOptions): Mask;
    /**
     * Bottom hat of an image.
     *
     * @param options - Bottom hat options.
     * @returns The bottom-hatted image.
     */
    bottomHat(options?: BottomHatOptions): Mask;
    /**
     * Apply morphological gradient to an image.
     *
     * @param options - Morphological gradient options.
     * @returns The processed image.
     */
    morphologicalGradient(options?: MorphologicalGradientOptions): Mask;
    /**
     * Remove elements connected to the borders of an image.
     *
     * @param options - Clear border options.
     * @returns The processed image.
     */
    clearBorder(options?: ClearBorderOptions): Mask;
    /**
     * Apply flood fill algorithm from a given starting point.
     *
     * @param options - Flood fill options.
     * @returns The filled mask.
     */
    floodFill(options?: FloodFillOptions): Mask;
    /**
     * Fill holes in regions of interest.
     *
     * @param options - Flood fill options.
     * @returns The filled mask.
     */
    solidFill(options?: SolidFillOptions): Mask;
    /**
     * Draw a set of points on a mask.
     *
     * @param points - Array of points.
     * @param options - Draw points on Image options.
     * @returns New mask.
     */
    drawPoints(points: Point[], options?: DrawPointsOptions): Mask;
    /**
     * Draw a line defined by two points onto a mask.
     *
     * @param from - Line starting point.
     * @param to - Line ending point.
     * @param options - Draw Line options.
     * @returns The mask with the line drawing.
     */
    drawLine(from: Point, to: Point, options?: DrawLineOnMaskOptions): Mask;
    /**
     * Draw a polyline defined by an array of points on a mask.
     *
     * @param points - Polyline array of points.
     * @param options - Draw polyline options.
     * @returns The mask with the polyline drawing.
     */
    drawPolyline(points: Point[], options?: DrawPolylineOnMaskOptions): Mask;
    /**
     * Draw a polygon defined by an array of points onto an mask.
     *
     * @param points - Polygon vertices.
     * @param options - Draw Line options.
     * @returns The mask with the polygon drawing.
     */
    drawPolygon(points: Point[], options?: DrawPolygonOnMaskOptions): Mask;
    /**
     * Draw a rectangle defined by position of the top-left corner, width and height.
     *
     * @param options - Draw rectangle options.
     * @returns The image with the rectangle drawing.
     */
    drawRectangle(options?: DrawRectangleOptions<Mask>): Mask;
    /**
     * Copy the mask to another one by specifying the location in the target mask.
     *
     * @param target - The target mask.
     * @param options - copyTo options.
     * @returns The target with the source copied to it.
     */
    copyTo(target: Mask, options?: CopyToOptions<Mask>): Mask;
    /**
     * Paint a mask onto another mask and the given position and with the given value.
     *
     * @param mask - Mask to paint.
     * @param options - Paint mask options.
     * @returns The painted mask.
     */
    paintMask(mask: Mask, options?: PaintMaskOnMaskOptions): Mask;
}
//# sourceMappingURL=Mask.d.ts.map