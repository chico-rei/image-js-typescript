import { ColorDepth } from '..';
import { CreateFromOptions, Image, ImageColorModel } from '../Image';
import { Mask } from '../Mask';

import { copyData } from './copyData';

export interface OutOptions {
  /**
   * Image to use as the output.
   * The image must have compatible properties or the method will throw.
   */
  out?: Image | Mask;
}

type NewImageParameters = Omit<CreateFromOptions, 'data'>;

interface OutInternalOptions {
  /**
   * Parameters that will be combined with the ones from
   * `thisImage`.
   */
  newParameters?: NewImageParameters;
  /**
   * Specify if the values of the original image should be cloned.
   */
  clone?: boolean;
}

/**
 * Use this function to support getting the output image of an algorithm from
 * user-supplied options.
 *
 * @param thisImage - Current image on which the algorithm is applied.
 * @param options - Options object received by the algorithm.
 * @param internalOptions - Some additional private options.
 * @returns The output image.
 */
export function getOutputImage(
  thisImage: Image,
  options: OutOptions = {},
  internalOptions: OutInternalOptions = {},
): Image {
  const { out } = options;
  const { newParameters, clone } = internalOptions;
  if (out === undefined) {
    if (clone) {
      return thisImage.clone();
    } else {
      return Image.createFrom(thisImage, newParameters);
    }
  } else {
    if (!(out instanceof Image)) {
      throw new TypeError('out must be an Image object');
    }
    const requirements: NewImageParameters = {
      width: thisImage.width,
      height: thisImage.height,
      depth: thisImage.depth,
      colorModel: thisImage.colorModel,
      ...newParameters,
    };
    checkRequirements(requirements, out);
    if (clone && thisImage !== out) {
      copyData(thisImage, out);
    }
    return out;
  }
}

/**
 * Use this function to support getting the output image of an algorithm from
 * user-supplied options when the input is a mask.
 *
 * @param mask - Current mask on which the algorithm is applied.
 * @param options - Options object received by the algorithm.
 * @returns The output image.
 */
export function maskToOutputImage(mask: Mask, options: OutOptions = {}): Image {
  const { out } = options;

  if (out === undefined) {
    return Image.createFrom(mask, {
      colorModel: ImageColorModel.GREY,
    });
  } else {
    if (!(out instanceof Image)) {
      throw new TypeError('out must be an Image object');
    }
    const requirements: NewImageParameters = {
      width: mask.width,
      height: mask.height,
      depth: ColorDepth.UINT8,
      colorModel: ImageColorModel.GREY,
    };
    checkRequirements(requirements, out);
    return out;
  }
}

/**
 * Use this function to support getting the output mask of an algorithm from
 * user-supplied options when the input is an image.
 *
 * @param image - Current image on which the algorithm is applied.
 * @param options - Options object received by the algorithm.
 * @returns The output mask.
 */
export function imageToOutputMask(
  image: Image,
  options: OutOptions = {},
): Mask {
  const { out } = options;
  if (out === undefined) {
    return Mask.createFrom(image);
  } else {
    if (!(out instanceof Mask)) {
      throw new TypeError('out must be a Mask object');
    }
    const requirements: NewImageParameters = {
      width: image.width,
      height: image.height,
      depth: ColorDepth.UINT1,
      colorModel: ImageColorModel.BINARY,
    };
    checkRequirements(requirements, out);
    return out;
  }
}

function checkRequirements<ReqType extends object, OutType extends ReqType>(
  requirements: ReqType,
  out: OutType,
): void {
  type Keys = keyof ReqType;
  for (const property in requirements) {
    const prop = property as Keys;
    if (out[prop] !== requirements[prop]) {
      throw new RangeError(
        `cannot use out. Its ${property} property must be ${requirements[prop]}. Found ${out[prop]}`,
      );
    }
  }
}

/**
 * Use this function to support getting the output mask of an algorithm from
 * user-supplied options when the input is an mask.
 *
 * @param mask - Current mask on which the algorithm is applied.
 * @param options - Options object received by the algorithm.
 * @param internalOptions - Additional private options.
 * @returns The output mask.
 */
export function maskToOutputMask(
  mask: Mask,
  options: OutOptions = {},
  internalOptions: OutInternalOptions = {},
): Mask {
  const { out } = options;
  const { newParameters, clone } = internalOptions;
  if (out === undefined) {
    if (clone) {
      return mask.clone();
    } else {
      return Mask.createFrom(mask, newParameters);
    }
  } else {
    if (!(out instanceof Mask)) {
      throw new TypeError('out must be a Mask object');
    }
    const requirements: NewImageParameters = {
      width: mask.width,
      height: mask.height,
      depth: ColorDepth.UINT1,
      colorModel: ImageColorModel.BINARY,
    };
    checkRequirements(requirements, out);
    if (clone && mask !== out) {
      copyData(mask, out);
    }
    return out;
  }
}
