import { IJS } from '../IJS';

/**
 * Compute the average pixel of an image.
 *
 * @param image - Image to process.
 * @returns The average pixel.
 */
export function average(image: IJS): number[] {
  let pixel = new Array(image.channels).fill(0);
  for (let row = 0; row < image.height; row++) {
    for (let column = 0; column < image.width; column++) {
      for (let channel = 0; channel < image.channels; channel++) {
        pixel[channel] += image.getValue(column, row, channel);
      }
    }
  }
  return pixel.map((channel) => channel / image.size);
}
