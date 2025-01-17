import { Image } from '../Image';
export interface WriteCanvasOptions {
    /**
     * If set to `true`, the canvas element will be resized to fit the image.
     *
     * @default true
     */
    resizeCanvas?: boolean;
    /**
     * @default 0
     */
    dx?: number;
    /**
     * @default 0
     */
    dy?: number;
    /**
     * @default 0
     */
    dirtyX?: number;
    /**
     * @default 0
     */
    dirtyY?: number;
    /**
     * @default image.width
     */
    dirtyWidth?: number;
    /**
     * @default image.height
     */
    dirtyHeight?: number;
}
/**
 * Draw the image in an HTML canvas.
 *
 * @param image - The image to draw.
 * @param canvas - The HTML canvas.
 * @param options - Write canvas options.
 */
export declare function writeCanvas(image: Image, canvas: HTMLCanvasElement, options?: WriteCanvasOptions): void;
//# sourceMappingURL=writeCanvas.d.ts.map