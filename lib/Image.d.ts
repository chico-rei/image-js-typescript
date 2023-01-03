import { RgbColor } from 'colord';
import { Mask } from './Mask';
import { SubtractImageOptions } from './compare';
import { DrawPolygonOnImageOptions, DrawPolylineOnImageOptions, DrawCircleOnImageOptions, DrawRectangleOptions, DrawLineOnImageOptions } from './draw';
import { DrawPointsOptions } from './draw/drawPoints';
import { BlurOptions, ConvolutionOptions, GaussianBlurOptions, HypotenuseOptions, GradientFilterOptions, DerivativeFilterOptions, FlipOptions, InvertOptions, LevelOptions } from './filters';
import { BottomHatOptions, CannyEdgeOptions, CloseOptions, DilateOptions, ErodeOptions, MorphologicalGradientOptions, OpenOptions, TopHatOptions } from './morphology';
import { ConvertColorOptions, CopyToOptions, CropOptions, PaintMaskOnImageOptions } from './operations';
import { CropAlphaOptions } from './operations/cropAlpha';
import { ImageColorModel } from './utils/constants/colorModels';
import { Point } from './utils/geometry/points';
import { ExtractOptions, GreyOptions, HistogramOptions, ResizeOptions, RotateOptions, ThresholdOptions, TransformOptions } from '.';
export { ImageColorModel, colorModels } from './utils/constants/colorModels';
export type ImageDataArray = Uint8Array | Uint16Array | Uint8ClampedArray;
/**
 * Bit depth of the image (nb of bits that encode each value in the image).
 */
export declare enum ColorDepth {
    UINT1 = 1,
    UINT8 = 8,
    UINT16 = 16
}
export declare enum ImageCoordinates {
    CENTER = "CENTER",
    TOP_LEFT = "TOP_LEFT",
    TOP_RIGHT = "TOP_RIGHT",
    BOTTOM_LEFT = "BOTTOM_LEFT",
    BOTTOM_RIGHT = "BOTTOM_RIGHT"
}
export interface ImageOptions {
    /**
     * Number of bits per value in each channel.
     *
     * @default `ColorDepth.UINT8`.
     */
    depth?: ColorDepth;
    /**
     * Typed array holding the image data.
     */
    data?: ImageDataArray;
    /**
     * Color model of the created image.
     *
     * @default `ImageColorModel.RGB`.
     */
    colorModel?: ImageColorModel;
    /**
     * Origin of the image relative to a parent image (top-left corner).
     *
     * @default {row: 0, column: 0}
     */
    origin?: Point;
}
export interface CreateFromOptions extends ImageOptions {
    width?: number;
    height?: number;
}
export type ImageValues = [number, number, number, number];
export declare class Image {
    /**
     * The number of columns of the image.
     */
    readonly width: number;
    /**
     * The number of rows of the image.
     */
    readonly height: number;
    /**
     * The total number of pixels in the image (width × height).
     */
    readonly size: number;
    /**
     * The number of bits per value in each channel.
     */
    readonly depth: ColorDepth;
    /**
     * The color model of the image.
     */
    readonly colorModel: ImageColorModel;
    /**
     * The number of color channels in the image, excluding the alpha channel.
     * A grey image has 1 component. An RGB image has 3 components.
     */
    readonly components: number;
    /**
     * The total number of channels in the image, including the alpha channel.
     */
    readonly channels: number;
    /**
     * Whether the image has an alpha channel or not.
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
     * Typed array holding the image data.
     */
    private readonly data;
    /**
     * Construct a new Image knowing its dimensions.
     *
     * @param width - Image width.
     * @param height - Image height.
     * @param options - Image options.
     */
    constructor(width: number, height: number, options?: ImageOptions);
    /**
     * Create a new Image based on the properties of an existing one.
     *
     * @param other - Reference image.
     * @param options - Image options.
     * @returns New image.
     */
    static createFrom(other: Image | Mask, options?: CreateFromOptions): Image;
    /**
     * Get all the channels of a pixel.
     *
     * @param column - Column index.
     * @param row - Row index.
     * @returns Channels of the pixel.
     */
    getPixel(column: number, row: number): number[];
    /**
     * Set all the channels of a pixel.
     *
     * @param column - Column index.
     * @param row - Row index.
     * @param value - New color of the pixel to set.
     */
    setPixel(column: number, row: number, value: number[]): void;
    /**
     * Set all the channels of a pixel if the coordinates are inside the image.
     *
     * @param column - Column index.
     * @param row - Row index.
     * @param value - New color of the pixel to set.
     */
    setVisiblePixel(column: number, row: number, value: number[]): void;
    /**
     * Get all the channels of a pixel using its index.
     *
     * @param index - Index of the pixel.
     * @returns Channels of the pixel.
     */
    getPixelByIndex(index: number): number[];
    /**
     * Set all the channels of a pixel using its index.
     *
     * @param index - Index of the pixel.
     * @param value - New channel values of the pixel to set.
     */
    setPixelByIndex(index: number, value: number[]): void;
    /**
     * Get the value of a specific pixel channel. Select pixel using coordinates.
     *
     * @param column - Column index.
     * @param row - Row index.
     * @param channel - Channel index.
     * @returns Value of the specified channel of one pixel.
     */
    getValue(column: number, row: number, channel: number): number;
    /**
     * Set the value of a specific pixel channel. Select pixel using coordinates.
     *
     * @param column - Column index.
     * @param row - Row index.
     * @param channel - Channel index.
     * @param value - Value to set.
     */
    setValue(column: number, row: number, channel: number, value: number): void;
    /**
     * Get the value of a specific pixel channel. Select pixel using index.
     *
     * @param index - Index of the pixel.
     * @param channel - Channel index.
     * @returns Value of the channel of the pixel.
     */
    getValueByIndex(index: number, channel: number): number;
    /**
     * Set the value of a specific pixel channel. Select pixel using index.
     *
     * @param index - Index of the pixel.
     * @param channel - Channel index.
     * @param value - Value to set.
     */
    setValueByIndex(index: number, channel: number, value: number): void;
    /**
     * Get the value of a specific pixel channel. Select pixel using a point.
     *
     * @param point - Coordinates of the desired pixel.
     * @param channel - Channel index.
     * @returns Value of the channel of the pixel.
     */
    getValueByPoint(point: Point, channel: number): number;
    /**
     * Set the value of a specific pixel channel. Select pixel using a point.
     *
     * @param point - Coordinates of the pixel.
     * @param channel - Channel index.
     * @param value - Value to set.
     */
    setValueByPoint(point: Point, channel: number, value: number): void;
    /**
     * Return the raw image data.
     *
     * @returns The raw data.
     */
    getRawImage(): {
        width: number;
        height: number;
        data: ImageDataArray;
        channels: number;
        depth: ColorDepth;
    };
    /**
     * Fill the image with a value or a color.
     *
     * @param value - Value or color.
     * @returns The image instance.
     */
    fill(value: number | number[]): this;
    /**
     * Fill one channel with a value.
     *
     * @param channel - The channel to fill.
     * @param value - The new value.
     * @returns The image instance.
     */
    fillChannel(channel: number, value: number): this;
    /**
     * Get one channel of the image as an array.
     *
     * @param channel - The channel to fill.
     * @returns Array with the channel values.
     */
    getChannel(channel: number): number[];
    /**
     * Fill the alpha channel with the specified value.
     *
     * @param value - New channel value.
     * @returns The image instance.
     */
    fillAlpha(value: number): this;
    /**
     * Create a copy of this image.
     *
     * @returns The image clone.
     */
    clone(): Image;
    /**
     * Modify all the values of the image using the given callback.
     *
     * @param cb - Callback that modifies a given value-
     */
    changeEach(cb: (value: number) => number): void;
    /**
     * Get the coordinates of a point in the image. The reference is the top-left corner.
     *
     * @param coordinates - The point for which you want the coordinates.
     * @param round - Should the coordinates be rounded? This is useful when you want the center of the image.
     * @returns Coordinates of the point in the format [column, row].
     */
    getCoordinates(coordinates: ImageCoordinates, round?: boolean): Point;
    /**
     * Subtract other from an image.
     *
     * @param other - Image to subtract
     * @param options - Inversion options
     * @returns The subtracted image.
     */
    subtract(other: Image, options?: SubtractImageOptions): Image;
    histogram(options?: HistogramOptions): Uint32Array;
    /**
     * Compute the mean pixel of an image.
     *
     * @returns The mean pixel.
     */
    mean(): number[];
    /**
     * Compute the median pixel of an image.
     *
     * @returns The median pixel.
     */
    median(): number[];
    /**
     * Compute the variance of each channel of an image.
     *
     * @returns The variance of the channels of the image.
     */
    variance(): number[];
    /**
     * Draw a set of points on an image.
     *
     * @param points - Array of points.
     * @param options - Draw points on Image options.
     * @returns New mask.
     */
    drawPoints(points: Point[], options?: DrawPointsOptions): Image;
    /**
     * Draw a line defined by two points onto an image.
     *
     * @param from - Line starting point.
     * @param to - Line ending point.
     * @param options - Draw Line options.
     * @returns The mask with the line drawing.
     */
    drawLine(from: Point, to: Point, options?: DrawLineOnImageOptions): Image;
    /**
     * Draw a rectangle defined by position of the top-left corner, width and height.
     *
     * @param options - Draw rectangle options.
     * @returns The image with the rectangle drawing.
     */
    drawRectangle(options?: DrawRectangleOptions<Image>): Image;
    /**
     * Draw a polyline defined by an array of points on an image.
     *
     * @param points - Polyline array of points.
     * @param options - Draw polyline options.
     * @returns The image with the polyline drawing.
     */
    drawPolyline(points: Point[], options?: DrawPolylineOnImageOptions): Image;
    /**
     * Draw a polygon defined by an array of points onto an image.
     *
     * @param points - Polygon vertices.
     * @param options - Draw Line options.
     * @returns The image with the polygon drawing.
     */
    drawPolygon(points: Point[], options?: DrawPolygonOnImageOptions): Image;
    /**
     * Draw a circle defined by center and radius onto an image.
     *
     * @param center - Circle center.
     * @param radius - Circle radius
     * @param options - Draw circle options.
     * @returns The image with the circle drawing.
     */
    drawCircle(center: Point, radius: number, options?: DrawCircleOnImageOptions): Image;
    split(): Image[];
    convertColor(colorModel: ImageColorModel, options?: ConvertColorOptions): Image;
    convertDepth(newDepth: ColorDepth): Image;
    grey(options?: GreyOptions): Image;
    copyTo(target: Image, options?: CopyToOptions<Image>): Image;
    threshold(options?: ThresholdOptions): Mask;
    /**
     * Crop the input image to a desired size.
     *
     * @param [options] - Crop options.
     * @returns The new cropped image
     */
    crop(options?: CropOptions): Image;
    /**
     * Crops the image based on the alpha channel
     * This removes lines and columns where the alpha channel is lower than a threshold value.
     *
     * @param options - Crop alpha options.
     * @returns The cropped image.
     */
    cropAlpha(options?: CropAlphaOptions): Image;
    /**
     * Extract the pixels of an image, as specified in a mask.
     *
     * @param mask - The mask defining which pixels to keep.
     * @param options - Extract options.
     * @returns The extracted image.
     */
    extract(mask: Mask, options?: ExtractOptions): Image;
    /**
     * Paint a mask onto an image and the given position and with the given color.
     *
     * @param mask - Mask to paint on the image.
     * @param options - Paint mask options.
     * @returns The painted image.
     */
    paintMask(mask: Mask, options?: PaintMaskOnImageOptions): Image;
    blur(options: BlurOptions): Image;
    directConvolution(kernel: number[][], options?: ConvolutionOptions): Image;
    /**
     * Compute direct convolution of an image and return an array with the raw values.
     *
     * @param kernel - Kernel used for the convolution.
     * @param options - Convolution options.
     * @returns Array with the raw convoluted values.
     */
    rawDirectConvolution(kernel: number[][], options?: ConvolutionOptions): Float64Array;
    separableConvolution(kernelX: number[], kernelY: number[], options?: ConvolutionOptions): Image;
    /**
     * Apply a gaussian filter to an image.
     *
     * @param options - Gaussian blur options.
     * @returns The blurred image.
     */
    gaussianBlur(options: GaussianBlurOptions): Image;
    /**
     * Flip the image.
     *
     * @param options - Flip options
     * @returns The flipped image.
     */
    flip(options?: FlipOptions): Image;
    /**
     *   Invert the colors of the image.
     *
     * @param options - Inversion options
     * @returns The inverted image.
     */
    invert(options?: InvertOptions): Image;
    /**
     * Calculate a new image that is the hypotenuse between the current image and the other.
     *
     * @param other - Other image.
     * @param options - Hypotenuse options.
     * @returns Hypotenuse of the two images.
     */
    hypotenuse(other: Image, options?: HypotenuseOptions): Image;
    /**
     * Apply a gradient filter to an image.
     *
     * @param options - Gradient filter options.
     * @returns The gradient image.
     */
    gradientFilter(options: GradientFilterOptions): Image;
    /**
     * Apply a derivative filter to an image.
     *
     * @param options - Derivative filter options.
     * @returns The processed image.
     */
    derivativeFilter(options?: DerivativeFilterOptions): Image;
    /**
     * Level the image using the optional input and output value. This function allows you to enhance the image's contrast.
     *
     * @param options - Level options.
     * @returns The levelled image.
     */
    level(options?: LevelOptions): Image;
    /**
     * Correct the colors in an image using the reference colors.
     *
     * @param measuredColors - Colors from the image, which will be compared to the reference.
     * @param referenceColors - Reference colors.
     * @returns Image with the colors corrected.
     */
    correctColor(measuredColors: RgbColor[], referenceColors: RgbColor[]): Image;
    rotate(angle: number, options?: RotateOptions): Image;
    resize(options: ResizeOptions): Image;
    transform(transformMatrix: number[][], options?: TransformOptions): Image;
    /**
     * Erode an image.
     *
     * @param options - Erode options.
     * @returns The eroded image.
     */
    erode(options?: ErodeOptions): Image;
    /**
     * Dilate an image.
     *
     * @param options - Dilate options.
     * @returns The dilated image.
     */
    dilate(options?: DilateOptions): Image;
    /**
     * Open an image.
     *
     * @param options - Open options.
     * @returns The opened image.
     */
    open(options?: OpenOptions): Image;
    /**
     * Close an image.
     *
     * @param options - Close options.
     * @returns The closed image.
     */
    close(options?: CloseOptions): Image;
    /**
     * Top hat of an image.
     *
     * @param options - Top hat options.
     * @returns The top-hatted image.
     */
    topHat(options?: TopHatOptions): Image;
    /**
     * Bottom hat of an image.
     *
     * @param options - Bottom hat options.
     * @returns The bottom-hatted image.
     */
    bottomHat(options?: BottomHatOptions): Image;
    /**
     * Apply morphological gradient to an image.
     *
     * @param options - morphological gradient options.
     * @returns The processed image.
     */
    morphologicalGradient(options?: MorphologicalGradientOptions): Image;
    /**
     * Apply Canny edge detection to an image.
     *
     * @param options - Canny edge detection options.
     * @returns The processed image.
     */
    cannyEdgeDetector(options?: CannyEdgeOptions): Mask;
}
//# sourceMappingURL=Image.d.ts.map