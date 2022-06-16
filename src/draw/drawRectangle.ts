import { IJS } from '../IJS';
import checkProcessable from '../utils/checkProcessable';
import { getDefaultColor } from '../utils/getDefaultColor';
import { getOutputImage } from '../utils/getOutputImage';

import { Point } from './drawLine';

export interface DrawRectangleOptions {
  /**
   * Rectangle border color array of N elements (e.g. R, G, B or G, A), N being the number of channels.
   *
   * @default "black"
   */
  color?: number[] | 'none';
  /**
   * Rectangle fill color array of N elements (e.g. R, G, B or G, A), N being the number of channels.
   *
   */
  fill?: number[];
  /**
   * Image to which the resulting image has to be put.
   */
  out?: IJS;
}
/**
 * Draw a rectangle defined by position, width and height.
 *
 * @memberof Image
 * @instance
 * @param image - Image to process.
 * @param position - Rectangle position.
 * @param width - Rectangle width.
 * @param height - Rectangle height.
 * @param options - Draw rectangle options.
 * @returns The original drew image
 */
export function drawRectangle(
  image: IJS,
  position: Point,
  width: number,
  height: number,
  options: DrawRectangleOptions = {},
) {
  const newImage = getOutputImage(image, options, { clone: true });
  const { color = getDefaultColor(newImage), fill } = options;

  checkProcessable(newImage, 'drawRectangle', {
    bitDepth: [8, 16],
  });
  if (color !== 'none') {
    for (let col = position.column; col < position.column + width; col++) {
      newImage.setPixel(col, position.row, color);
      newImage.setPixel(col, position.row + height - 1, color);
    }
    for (let row = position.row + 1; row < position.row + height - 1; row++) {
      newImage.setPixel(position.column, row, color);
      newImage.setPixel(position.column + width - 1, row, color);

      if (fill) {
        for (
          let col = position.column + 1;
          col < position.column + width - 1;
          col++
        ) {
          newImage.setPixel(col, row, fill);
          newImage.setPixel(col, row, fill);
        }
      }
    }
  }
  // color is none but fill is defined
  else if (fill) {
    for (let row = position.row + 1; row < position.row + height - 1; row++) {
      for (
        let col = position.column + 1;
        col < position.column + width - 1;
        col++
      ) {
        newImage.setPixel(col, row, fill);
        newImage.setPixel(col, row, fill);
      }
    }
  }
  return newImage;
}