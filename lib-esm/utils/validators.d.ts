import { Image } from '../Image';
import { Mask } from '../Mask';
/**
 * Validate an array of channels.
 *
 * @param channels - Array of channels.
 * @param image - The image being processed
 */
export declare function validateChannels(channels: number[], image: Image): void;
/**
 * Validates that a channel index passed by the user is within range and is an integer.
 *
 * @param channel - Channel index to validate.
 * @param image - The image being processed.
 */
export declare function validateChannel(channel: number, image: Image): void;
/**
 * Validates that a value passed by the user is positive and within range.
 *
 * @param value - Value to validate.
 * @param image - Image from which the value comes.
 */
export declare function validateValue(value: number, image: Image): void;
/**
 * Validate that two images are compatible for comparison functions.
 *
 * @param process - Process name.
 * @param image - First image.
 * @param other - Second image.
 */
export declare function validateForComparison(process: string, image: Image | Mask, other: Image | Mask): void;
//# sourceMappingURL=validators.d.ts.map