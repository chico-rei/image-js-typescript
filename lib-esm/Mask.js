import { ColorDepth, colorModels, ImageColorModel } from './Image';
import { subtract } from './compare';
import { drawLineOnMask, drawPolygonOnMask, drawPolylineOnMask, drawRectangle, } from './draw';
import { drawPoints } from './draw/drawPoints';
import { and, invert, or, } from './filters';
import { getBorderPoints, getConvexHull, getFeret, } from './maskAnalysis';
import { getMbr } from './maskAnalysis/getMbr';
import { bottomHat, clearBorder, close, dilate, floodFill, morphologicalGradient, open, solidFill, topHat, } from './morphology';
import { erode } from './morphology/erode';
import { convertColor, copyTo, paintMaskOnMask, } from './operations';
import { boolToNumber } from './utils/boolToNumber';
export class Mask {
    /**
     * Construct a new Mask knowing its dimensions.
     *
     * @param width - Image width.
     * @param height - Image height.
     * @param options - Image options.
     */
    constructor(width, height, options = {}) {
        const { data, origin = { row: 0, column: 0 } } = options;
        if (width < 1 || !Number.isInteger(width)) {
            throw new RangeError(`width must be an integer and at least 1. Received ${width}`);
        }
        if (height < 1 || !Number.isInteger(height)) {
            throw new RangeError(`height must be an integer and at least 1. Received ${height}`);
        }
        this.width = width;
        this.height = height;
        this.size = width * height;
        this.depth = ColorDepth.UINT1;
        this.colorModel = ImageColorModel.BINARY;
        this.origin = origin;
        const colorModelDef = colorModels[this.colorModel];
        this.components = colorModelDef.components;
        this.alpha = colorModelDef.alpha;
        this.channels = colorModelDef.channels;
        this.maxValue = 1;
        if (data === undefined) {
            this.data = new Uint8Array(this.size);
        }
        else {
            const expectedLength = this.size * this.channels;
            if (data.length !== expectedLength) {
                throw new RangeError(`incorrect data size: ${data.length}. Expected ${expectedLength}`);
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
    static createFrom(other, options = {}) {
        const { width = other.width, height = other.height, origin = other.origin, } = options;
        return new Mask(width, height, { origin, ...options });
    }
    /**
     * Geta pixel of the mask.
     *
     * @param column - Column index.
     * @param row - Row index.
     * @returns The pixel.
     */
    getPixel(column, row) {
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
    setPixel(column, row, value) {
        const index = row * this.width + column;
        this.data[index] = value[0];
    }
    /**
     * Set a pixel to a given value if the coordinates are inside the mask.
     *
     * @param column - Column index.
     * @param row - Row index.
     * @param value - New color of the pixel to set.
     */
    setVisiblePixel(column, row, value) {
        if (column >= 0 && column < this.width && row >= 0 && row < this.height) {
            this.setPixel(column, row, value);
        }
    }
    /**
     * Get a pixel using its index.
     *
     * @param index - Index of the pixel.
     * @returns The pixel.
     */
    getPixelByIndex(index) {
        return [this.data[index]];
    }
    /**
     * Set a pixel using its index.
     *
     * @param index - Index of the pixel.
     * @param value - Newvalue of the pixel to set.
     */
    setPixelByIndex(index, value) {
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
    static fromPoints(width, height, points) {
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
    clone() {
        return Mask.createFrom(this, { data: this.data.slice() });
    }
    /**
     * Get the value of a bit.
     *
     * @param column - Column index.
     * @param row - Row index.
     * @returns The bit value.
     */
    getBit(column, row) {
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
    setBit(column, row, value) {
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
    getBitByIndex(index) {
        return this.data[index * this.channels];
    }
    /**
     * Set the value of a bit using index.
     *
     * @param index - Index of the pixel.
     * @param value - Value to set.
     */
    setBitByIndex(index, value) {
        let result = boolToNumber(value);
        this.data[index * this.channels] = result;
    }
    /**
     * Get the value of a bit. Function exists for compatibility with Image.
     *
     * @param column - Column index.
     * @param row - Row index.
     * @param channel - Index of the channel, must be zero.
     * @returns The bit value.
     */
    getValue(column, row, channel) {
        checkChannel(channel);
        return this.getBit(column, row);
    }
    /**
     * Set the value of a bit. Function exists for compatibility with Image.
     *
     * @param column - Column index.
     * @param row - Row index.
     * @param channel - Index of the channel, must be zero.
     * @param value - New bit value.
     */
    setValue(column, row, channel, value) {
        checkChannel(channel);
        this.setBit(column, row, value);
    }
    /**
     * Get the value of a bit using index. Function exists for compatibility with Image.
     *
     * @param index - Index of the pixel.
     * @param channel - Index of the channel, must be zero.
     * @returns Value of the bit.
     */
    getValueByIndex(index, channel) {
        checkChannel(channel);
        return this.getBitByIndex(index);
    }
    /**
     * Set the value of a bit using index. Function exists for compatibility with Image.
     *
     * @param index - Index of the pixel.
     * @param channel - Index of the channel, must be zero.
     * @param value - Value to set.
     */
    setValueByIndex(index, channel, value) {
        checkChannel(channel);
        this.setBitByIndex(index, value);
    }
    /**
     * Get the value of a specific bit. Select bit using a point.
     *
     * @param point - Coordinates of the desired biz.
     * @returns Value of the bit.
     */
    getValueByPoint(point) {
        return this.getValue(point.column, point.row, 0);
    }
    /**
     * Set the value of a specific bit. Select bit using a point.
     *
     * @param point - Coordinates of the bit.
     * @param value - Value to set.
     */
    setValueByPoint(point, value) {
        this.setValue(point.column, point.row, 0, value);
    }
    /**
     * Return the raw mask data.
     *
     * @returns The raw data.
     */
    getRawImage() {
        return {
            width: this.width,
            height: this.height,
            data: this.data,
        };
    }
    [Symbol.for('nodejs.util.inspect.custom')]() {
        let dataString;
        if (this.height > 20 || this.width > 20) {
            dataString = '[...]';
        }
        else {
            dataString = printData(this);
        }
        return `Mask {
  width: ${this.width}
  height: ${this.height}
  data: ${dataString}
}`;
    }
    /**
     * Fill the mask with a value.
     *
     * @param value - Value of the bit.
     * @returns The mask instance.
     */
    fill(value) {
        let result = boolToNumber(value);
        this.data.fill(result);
        return this;
    }
    convertColor(colorModel) {
        return convertColor(this, colorModel);
    }
    // FILTERS
    /**
     * Invert the colors of the mask.
     *
     * @param options - Inversion options
     * @returns The inverted mask.
     */
    invert(options) {
        return invert(this, options);
    }
    /**
     * Subtract other from a mask.
     *
     * @param other - Image to subtract
     * @param options - Inversion options
     * @returns The subtracted mask.
     */
    subtract(other, options) {
        return subtract(this, other, options);
    }
    /**
     * Perform an AND operation on two masks.
     *
     * @param other - Second mask.
     * @param options - And options.
     * @returns AND of the two masks.
     */
    and(other, options) {
        return and(this, other, options);
    }
    /**
     * Perform an OR operation on two masks.
     *
     * @param other - Second mask.
     * @param options - And options.
     * @returns OR of the two masks.
     */
    or(other, options) {
        return or(this, other, options);
    }
    // MASK ANALYSIS
    /**
     * Get the coordinates of the points on the border of a shape defined in a mask.
     *
     * @param options - Get border points options.
     * @returns Array of boder points.
     */
    getBorderPoints(options) {
        return getBorderPoints(this, options);
    }
    /**
     * Get the vertices of the convex Hull polygon of a mask.
     *
     * @returns Array of the vertices of the convex Hull in clockwise order.
     */
    getConvexHull() {
        return getConvexHull(this);
    }
    /**
     * Get the corners of the minimum bounding rectangle of a shape defined in a mask.
     *
     * @returns Array of boder points.
     */
    getMbr() {
        return getMbr(this);
    }
    /**
     * Computes the Feret data.
     *
     * @returns The Feret diameters.
     */
    getFeret() {
        return getFeret(this);
    }
    // MORPHOLOGY
    /**
     * Erode a Mask.
     *
     * @param options - Erode options
     * @returns The eroded mask.
     */
    erode(options) {
        return erode(this, options);
    }
    /**
     * Dilate an image.
     *
     * @param options - Dilate options.
     * @returns The dilated image.
     */
    dilate(options) {
        return dilate(this, options);
    }
    /**
     * Open an image.
     *
     * @param options - Open options.
     * @returns The opened image.
     */
    open(options) {
        return open(this, options);
    }
    /**
     * Close an image.
     *
     * @param options - Close options.
     * @returns The closed image.
     */
    close(options) {
        return close(this, options);
    }
    /**
     * Top hat of an image.
     *
     * @param options - Top hat options.
     * @returns The top-hatted image.
     */
    topHat(options) {
        return topHat(this, options);
    }
    /**
     * Bottom hat of an image.
     *
     * @param options - Bottom hat options.
     * @returns The bottom-hatted image.
     */
    bottomHat(options) {
        return bottomHat(this, options);
    }
    /**
     * Apply morphological gradient to an image.
     *
     * @param options - Morphological gradient options.
     * @returns The processed image.
     */
    morphologicalGradient(options) {
        return morphologicalGradient(this, options);
    }
    /**
     * Remove elements connected to the borders of an image.
     *
     * @param options - Clear border options.
     * @returns The processed image.
     */
    clearBorder(options) {
        return clearBorder(this, options);
    }
    /**
     * Apply flood fill algorithm from a given starting point.
     *
     * @param options - Flood fill options.
     * @returns The filled mask.
     */
    floodFill(options) {
        return floodFill(this, options);
    }
    /**
     * Fill holes in regions of interest.
     *
     * @param options - Flood fill options.
     * @returns The filled mask.
     */
    solidFill(options) {
        return solidFill(this, options);
    }
    // DRAW
    /**
     * Draw a set of points on a mask.
     *
     * @param points - Array of points.
     * @param options - Draw points on Image options.
     * @returns New mask.
     */
    drawPoints(points, options = {}) {
        return drawPoints(this, points, options);
    }
    /**
     * Draw a line defined by two points onto a mask.
     *
     * @param from - Line starting point.
     * @param to - Line ending point.
     * @param options - Draw Line options.
     * @returns The mask with the line drawing.
     */
    drawLine(from, to, options = {}) {
        return drawLineOnMask(this, from, to, options);
    }
    /**
     * Draw a polyline defined by an array of points on a mask.
     *
     * @param points - Polyline array of points.
     * @param options - Draw polyline options.
     * @returns The mask with the polyline drawing.
     */
    drawPolyline(points, options = {}) {
        return drawPolylineOnMask(this, points, options);
    }
    /**
     * Draw a polygon defined by an array of points onto an mask.
     *
     * @param points - Polygon vertices.
     * @param options - Draw Line options.
     * @returns The mask with the polygon drawing.
     */
    drawPolygon(points, options = {}) {
        return drawPolygonOnMask(this, points, options);
    }
    /**
     * Draw a rectangle defined by position of the top-left corner, width and height.
     *
     * @param options - Draw rectangle options.
     * @returns The image with the rectangle drawing.
     */
    drawRectangle(options = {}) {
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
    copyTo(target, options = {}) {
        return copyTo(this, target, options);
    }
    /**
     * Paint a mask onto another mask and the given position and with the given value.
     *
     * @param mask - Mask to paint.
     * @param options - Paint mask options.
     * @returns The painted mask.
     */
    paintMask(mask, options) {
        return paintMaskOnMask(this, mask, options);
    }
}
/**
 * Returns all values of a mask as a string.
 *
 * @param mask - Input mask.
 * @returns Formatted string with all values of a mask.
 */
function printData(mask) {
    const result = [];
    for (let row = 0; row < mask.height; row++) {
        const line = [];
        for (let column = 0; column < mask.width; column++) {
            line.push(String(mask.getBit(column, row)));
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
function checkChannel(channel) {
    if (channel !== 0) {
        throw new Error(`Channel value must be 0 on type Mask, got ${channel}.`);
    }
}
//# sourceMappingURL=Mask.js.map