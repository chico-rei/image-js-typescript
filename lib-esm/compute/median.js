// @ts-expect-error: median-quisckselect has no types
import quickMedian from 'median-quickselect';
/**
 * Returns the median pixel of the image. The median is computed on each channel individually.
 *
 * @param image - Image to process.
 * @returns Median pixel.
 */
export function median(image) {
    let pixel = new Array(image.channels).fill(0);
    for (let i = 0; i < image.channels; i++) {
        const channel = image.getChannel(i);
        pixel[i] = quickMedian(channel);
    }
    return pixel;
}
//# sourceMappingURL=median.js.map