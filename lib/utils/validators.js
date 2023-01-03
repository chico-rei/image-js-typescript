"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateForComparison = exports.validateValue = exports.validateChannel = exports.validateChannels = void 0;
/**
 * Validate an array of channels.
 *
 * @param channels - Array of channels.
 * @param image - The image being processed
 */
function validateChannels(channels, image) {
    for (const channel of channels) {
        validateChannel(channel, image);
    }
}
exports.validateChannels = validateChannels;
/**
 * Validates that a channel index passed by the user is within range and is an integer.
 *
 * @param channel - Channel index to validate.
 * @param image - The image being processed.
 */
function validateChannel(channel, image) {
    if (!Number.isInteger(channel) || channel >= image.channels || channel < 0) {
        throw new RangeError(`invalid channel: ${channel}. It must be a positive integer smaller than ${image.channels}`);
    }
}
exports.validateChannel = validateChannel;
/**
 * Validates that a value passed by the user is positive and within range.
 *
 * @param value - Value to validate.
 * @param image - Image from which the value comes.
 */
function validateValue(value, image) {
    if (value > image.maxValue || value < 0) {
        throw new RangeError(`invalid value: ${value}. It must be a positive value smaller than ${image.maxValue + 1}`);
    }
}
exports.validateValue = validateValue;
/**
 * Validate that two images are compatible for comparison functions.
 *
 * @param process - Process name.
 * @param image - First image.
 * @param other - Second image.
 */
function validateForComparison(process, image, other) {
    if (image.width !== other.width || image.height !== other.height) {
        throw new Error(`${process}: both images must have the same size`);
    }
    if (image.alpha !== other.alpha || image.depth !== other.depth) {
        throw new Error(`${process}: both images must have the same alpha and depth`);
    }
    if (image.channels !== other.channels) {
        throw new Error(`${process}: both images must have the same number of channels`);
    }
}
exports.validateForComparison = validateForComparison;
//# sourceMappingURL=validators.js.map