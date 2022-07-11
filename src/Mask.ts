import {
  drawLineOnMask,
  DrawLineOnMaskOptions,
  drawPolygonOnMask,
  DrawPolygonOnMaskOptions,
  drawPolylineOnMask,
  DrawPolylineOnMaskOptions,
  drawRectangle,
  DrawRectangleOptions,
} from './draw';
import {
  and,
  AndOptions,
  invert,
  InvertOptions,
  or,
  OrOptions,
  subtractImage,
  SubtractImageOptions,
} from './filters';
import { GetBorderPointsOptions, getBorderPoints } from './maskAnalysis';
import { getMbr } from './maskAnalysis/getMbr';
import {
  bottomHat,
  BottomHatOptions,
  clearBorder,
  ClearBorderOptions,
  close,
  CloseOptions,
  dilate,
  DilateOptions,
  ErodeOptions,
  floodFill,
  FloodFillOptions,
  morphologicalGradient,
  MorphologicalGradientOptions,
  open,
  OpenOptions,
  solidFill,
  SolidFillOptions,
  topHat,
  TopHatOptions,
} from './morphology';
import { erode } from './morphology/erode';
import { boolToNumber } from './utils/boolToNumber';
import { Point } from './utils/geometry/points';

import {
  ImageColorModel,
  ColorDepth,
  colorModels,
  IJS,
  convertColor,
  CopyToOptions,
  copyTo,
} from '.';

export type BitValue = 1 | 0 | boolean;

export interface MaskOptions {
  /**
   * Typed array holding the mask data.
   */
  data?: Uint8Array;
}

export interface MaskCreateFromOptions extends MaskOptions {
  width?: number;
  height?: number;
}

export class Mask {
  /**
   * The number of columns of the mask.
   */
  public readonly width: number;

  /**
   * The number of rows of the mask.
   */
  public readonly height: number;

  /**
   * The total number of bits in the mask (width × height).
   */
  public readonly size: number;

  /**
   * The number of bits per value in each channel (always 1).
   */
  public readonly depth: ColorDepth;

  /**
   * The color model of the mask (always BINARY).
   */
  public readonly colorModel: ImageColorModel;

  /**
   * The number of color channels in the image, excluding the alpha channel.
   * (always 1)
   */
  public readonly components: number;

  /**
   * The number of channels in the mask, including the alpha channel.
   * (always 1)
   */
  public readonly channels: number;

  /**
   * Specifying that the mask has no an alpha channel.
   */
  public readonly alpha: boolean;

  /**
   * The maximum value that a pixel channel can have.
   */
  public readonly maxValue: number;

  /**
   * Typed array holding the mask data.
   */
  private readonly data: Uint8Array;

  /**
   * Construct a new Mask knowing its dimensions.
   *
   * @param width - Image width.
   * @param height - Image height.
   * @param options - Image options.
   */
  public constructor(width: number, height: number, options: MaskOptions = {}) {
    const { data } = options;

    if (width < 1 || !Number.isInteger(width)) {
      throw new RangeError(
        `width must be an integer and at least 1. Received ${width}`,
      );
    }

    if (height < 1 || !Number.isInteger(height)) {
      throw new RangeError(
        `height must be an integer and at least 1. Received ${height}`,
      );
    }

    this.width = width;
    this.height = height;
    this.size = width * height;
    this.depth = ColorDepth.UINT1;
    this.colorModel = ImageColorModel.BINARY;

    const colorModelDef = colorModels[this.colorModel];
    this.components = colorModelDef.components;
    this.alpha = colorModelDef.alpha;
    this.channels = colorModelDef.channels;

    this.maxValue = 1;

    if (data === undefined) {
      this.data = new Uint8Array(this.size);
    } else {
      const expectedLength = this.size * this.channels;
      if (data.length !== expectedLength) {
        throw new RangeError(
          `incorrect data size: ${data.length}. Expected ${expectedLength}`,
        );
      }
      this.data = data;
    }
  }

  /**
   * Create a new Mask based on the properties of an existing one.
   *
   * @param other - Reference Mask.
   * @param options - Mask options.
   * @returns New mask.
   */
  public static createFrom(
    other: Mask | IJS,
    options: MaskCreateFromOptions = {},
  ): Mask {
    const { width = other.width, height = other.height } = options;
    return new Mask(width, height, options);
  }

  /**
   * Geta pixel of the mask.
   *
   * @param column - Column index.
   * @param row - Row index.
   * @returns The pixel.
   */
  public getPixel(column: number, row: number): number[] {
    const result = [];
    const index = row * this.width + column;
    result.push(this.data[index]);
    return result;
  }

  /**
   * Set a pixel.
   *
   * @param column - Column index.
   * @param row - Row index.
   * @param value - The pixelvalue.
   */
  public setPixel(column: number, row: number, value: number[]): void {
    const index = row * this.width + column;
    this.data[index] = value[0];
  }

  /**
   * Get a pixel using its index.
   *
   * @param index - Index of the pixel.
   * @returns The pixel.
   */
  public getPixelByIndex(index: number): number[] {
    return [this.data[index]];
  }

  /**
   * Set a pixel using its index.
   *
   * @param index - Index of the pixel.
   * @param value - Newvalue of the pixel to set.
   */
  public setPixelByIndex(index: number, value: number[]): void {
    this.data[index] = value[0];
  }

  /**
   * Create a mask from an array of points.
   *
   * @param width - Width of the mask.
   * @param height - Height of the mask.
   * @param points - Reference Mask.
   * @returns New mask.
   */
  public static fromPoints(
    width: number,
    height: number,
    points: Point[],
  ): Mask {
    let mask = new Mask(width, height);

    for (const point of points) {
      mask.setBit(point.column, point.row, 1);
    }

    return mask;
  }

  /**
   * Create a copy of this mask.
   *
   * @returns The mask clone.
   */
  public clone(): Mask {
    return Mask.createFrom(this, { data: this.data.slice() });
  }

  /**
   * Get the value of a bit.
   *
   * @param column - Column index.
   * @param row - Row index.
   * @returns The bit value.
   */
  public getBit(column: number, row: number): number {
    const index = row * this.width + column;
    return this.data[index];
  }

  /**
   * Set the value of a bit.
   *
   * @param column - Column index.
   * @param row - Row index.
   * @param value - New bit value.
   */
  public setBit(column: number, row: number, value: BitValue): void {
    const index = row * this.width + column;
    // @ts-expect-error: we know that value is a boolean
    this.data[index] = value;
  }

  /**
   * Get the value of a bit using index.
   *
   * @param index - Index of the pixel.
   * @returns Value of the bit.
   */
  public getBitByIndex(index: number): number {
    return this.data[index * this.channels];
  }

  /**
   * Set the value of a bit using index.
   *
   * @param index - Index of the pixel.
   * @param value - Value to set.
   */
  public setBitByIndex(index: number, value: BitValue): void {
    let result = boolToNumber(value);
    this.data[index * this.channels] = result;
  }

  /**
   * Get the value of a bit. Function exists for compatibility with IJS.
   *
   * @param column - Column index.
   * @param row - Row index.
   * @param channel - Index of the channel, must be zero.
   * @returns The bit value.
   */
  public getValue(column: number, row: number, channel: number): number {
    checkChannel(channel);
    return this.getBit(column, row);
  }

  /**
   * Set the value of a bit. Function exists for compatibility with IJS.
   *
   * @param column - Column index.
   * @param row - Row index.
   * @param channel - Index of the channel, must be zero.
   * @param value - New bit value.
   */
  public setValue(
    column: number,
    row: number,
    channel: number,
    value: BitValue,
  ): void {
    checkChannel(channel);
    this.setBit(column, row, value);
  }

  /**
   * Get the value of a bit using index. Function exists for compatibility with IJS.
   *
   * @param index - Index of the pixel.
   * @param channel - Index of the channel, must be zero.
   * @returns Value of the bit.
   */
  public getValueByIndex(index: number, channel: number): number {
    checkChannel(channel);
    return this.getBitByIndex(index);
  }

  /**
   * Set the value of a bit using index. Function exists for compatibility with IJS.
   *
   * @param index - Index of the pixel.
   * @param channel - Index of the channel, must be zero.
   * @param value - Value to set.
   */
  public setValueByIndex(
    index: number,
    channel: number,
    value: BitValue,
  ): void {
    checkChannel(channel);
    this.setBitByIndex(index, value);
  }

  /**
   * Return the raw mask data.
   *
   * @returns The raw data.
   */
  public getRawImage() {
    return {
      width: this.width,
      height: this.height,
      data: this.data,
    };
  }

  public [Symbol.for('nodejs.util.inspect.custom')](): string {
    return `Mask {
  width: ${this.width}
  height: ${this.height}
  data: ${printData(this)}
}`;
  }

  /**
   * Fill the mask with a value.
   *
   * @param value - Value of the bit.
   * @returns The mask instance.
   */
  public fill(value: BitValue): this {
    let result = boolToNumber(value);
    this.data.fill(result);
    return this;
  }

  public convertColor(colorModel: ImageColorModel): IJS {
    return convertColor(this, colorModel);
  }

  // FILTERS
  /**
   * Invert the colors of the mask.
   *
   * @param options - Inversion options
   * @returns The inverted mask.
   */
  public invert(options?: InvertOptions): Mask {
    return invert(this, options);
  }

  /**
   * Subtract other from a mask.
   *
   * @param other - Image to subtract
   * @param options - Inversion options
   * @returns The subtracted mask.
   */
  public subtractImage(other: Mask, options?: SubtractImageOptions): Mask {
    return subtractImage(this, other, options);
  }

  /**
   * Perform an AND operation on two masks.
   *
   * @param other - Second mask.
   * @param options - And options.
   * @returns AND of the two masks.
   */
  public and(other: Mask, options?: AndOptions): Mask {
    return and(this, other, options);
  }
  /**
   * Perform an OR operation on two masks.
   *
   * @param other - Second mask.
   * @param options - And options.
   * @returns OR of the two masks.
   */
  public or(other: Mask, options?: OrOptions): Mask {
    return or(this, other, options);
  }

  // MASK ANALYSIS
  /**
   * Get the coordinates of the points on the border of a shape defined in a mask.
   *
   * @param options - Get border points options.
   * @returns Array of boder points.
   */
  public getBorderPoints(options?: GetBorderPointsOptions): Point[] {
    return getBorderPoints(this, options);
  }
  /**
   * Get the corners of the minimum bounding rectangle of a shape defined in a mask.
   *
   * @returns Array of boder points.
   */
  public getMbr(): Point[] {
    return getMbr(this);
  }

  // MORPHOLOGY
  /**
   * Erode a Mask.
   *
   * @param options - Erode options
   * @returns The eroded mask.
   */
  public erode(options?: ErodeOptions): Mask {
    return erode(this, options);
  }

  /**
   * Dilate an image.
   *
   * @param options - Dilate options.
   * @returns The dilated image.
   */
  public dilate(options?: DilateOptions): Mask {
    return dilate(this, options);
  }

  /**
   * Open an image.
   *
   * @param options - Open options.
   * @returns The opened image.
   */
  public open(options?: OpenOptions): Mask {
    return open(this, options);
  }

  /**
   * Close an image.
   *
   * @param options - Close options.
   * @returns The closed image.
   */
  public close(options?: CloseOptions): Mask {
    return close(this, options);
  }

  /**
   * Top hat of an image.
   *
   * @param options - Top hat options.
   * @returns The top-hatted image.
   */
  public topHat(options?: TopHatOptions): Mask {
    return topHat(this, options);
  }

  /**
   * Bottom hat of an image.
   *
   * @param options - Bottom hat options.
   * @returns The bottom-hatted image.
   */
  public bottomHat(options?: BottomHatOptions): Mask {
    return bottomHat(this, options);
  }

  /**
   * Apply morphological gradient to an image.
   *
   * @param options - Morphological gradient options.
   * @returns The processed image.
   */
  public morphologicalGradient(options?: MorphologicalGradientOptions): Mask {
    return morphologicalGradient(this, options);
  }

  /**
   * Remove elements connected to the borders of an image.
   *
   * @param options - Clear border options.
   * @returns The processed image.
   */
  public clearBorder(options?: ClearBorderOptions): Mask {
    return clearBorder(this, options);
  }
  /**
   * Apply flood fill algorithm from a given starting point.
   *
   * @param options - Flood fill options.
   * @returns The filled mask.
   */
  public floodFill(options?: FloodFillOptions): Mask {
    return floodFill(this, options);
  }
  /**
   * Fill holes in regions of interest.
   *
   * @param options - Flood fill options.
   * @returns The filled mask.
   */
  public solidFill(options?: SolidFillOptions): Mask {
    return solidFill(this, options);
  }

  // DRAW

  /**
   * Draw a line defined by two points onto a mask.
   *
   * @param from - Line starting point.
   * @param to - Line ending point.
   * @param options - Draw Line options.
   * @returns The mask with the line drawing.
   */
  public drawLine(
    from: Point,
    to: Point,
    options: DrawLineOnMaskOptions = {},
  ): Mask {
    return drawLineOnMask(this, from, to, options);
  }

  /**
   * Draw a polyline defined by an array of points on a mask.
   *
   * @param points - Polyline array of points.
   * @param options - Draw polyline options.
   * @returns The mask with the polyline drawing.
   */
  public drawPolyline(
    points: Point[],
    options: DrawPolylineOnMaskOptions = {},
  ): Mask {
    return drawPolylineOnMask(this, points, options);
  }

  /**
   * Draw a polygon defined by an array of points onto an mask.
   *
   * @param points - Polygon vertices.
   * @param options - Draw Line options.
   * @returns The mask with the polygon drawing.
   */
  public drawPolygon(
    points: Point[],
    options: DrawPolygonOnMaskOptions = {},
  ): Mask {
    return drawPolygonOnMask(this, points, options);
  }

  /**
   * Draw a rectangle defined by position of the top-left corner, width and height.
   *
   * @param options - Draw rectangle options.
   * @returns The image with the rectangle drawing.
   */
  public drawRectangle(options: DrawRectangleOptions<Mask> = {}): Mask {
    return drawRectangle(this, options);
  }

  // OPERATIONS

  /**
   * Copy the mask to another one by specifying the location in the target mask.
   *
   * @param target - The target mask.
   * @param options - copyTo options.
   * @returns The target with the source copied to it.
   */
  public copyTo(target: Mask, options: CopyToOptions<Mask> = {}): Mask {
    return copyTo(this, target, options);
  }
}

/**
 * Returns all values of a mask as a string.
 *
 * @param mask - Input mask.
 * @returns Formatted string with all values of a mask.
 */
function printData(mask: Mask): string {
  const result = [];
  const padding = 2;
  for (let row = 0; row < mask.height; row++) {
    const line = [];
    for (let column = 0; column < mask.width; column++) {
      line.push(String(mask.getBit(column, row)).padStart(padding, ' '));
    }
    result.push(`[${line.join(' ')}]`);
  }
  return result.join('\n        ');
}

/**
 * Verify the channel value of a mask
 *
 * @param channel - The channel value
 */
function checkChannel(channel: number) {
  if (channel !== 0) {
    throw new Error(`Channel value must be 0 on type Mask, got ${channel}.`);
  }
}
