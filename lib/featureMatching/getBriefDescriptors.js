"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBriefDescriptors = void 0;
const Image_1 = require("../Image");
const checkProcessable_1 = __importDefault(require("../utils/checkProcessable"));
const interpolatePixel_1 = require("../utils/interpolatePixel");
const compareIntensity_1 = require("./utils/compareIntensity");
const extractSquareImage_1 = require("./utils/extractSquareImage");
const getGaussianPoints_1 = require("./utils/getGaussianPoints");
/**
 * Generate the rBRIEF descriptors for the desired keypoints of an image.
 * The rBRIEF descriptors are presented in these articles:
 * - ORB article: DOI: 10.1109/ICCV.2011.6126544
 * - rBRIEF article: DOI: 10.1007/978-3-642-15561-1_56
 *
 * @param image - Source image of the keypoints.
 * @param keypoints - Keypoints for which the descriptors are wanted.
 * @param options - Get rotated BRIEF descriptors options
 * @returns The descriptors for the given keypoints.
 */
function getBriefDescriptors(image, keypoints, options = {}) {
    const { patchSize = 31, descriptorLength = 256, smoothingOptions = { sigma: Math.sqrt(2), size: 9 }, pointsDistributionOptions, } = options;
    (0, checkProcessable_1.default)(image, 'getBriefDescriptors', {
        alpha: false,
        colorModel: Image_1.ImageColorModel.GREY,
    });
    if (!(patchSize % 2)) {
        throw new Error('getBriefDescriptors: patchSize should be an odd integer');
    }
    const gaussianPoints = (0, getGaussianPoints_1.getGaussianPoints)(patchSize, patchSize, {
        ...pointsDistributionOptions,
        nbPoints: descriptorLength * 2,
    });
    const smoothed = image.gaussianBlur(smoothingOptions);
    const descriptors = [];
    for (let keypoint of keypoints) {
        // crop smallest square surrounding the tilted patch of the keypoint
        // we have to handle the fact that this square can have even dimensions
        const rawWidth = Math.ceil(patchSize *
            (Math.abs(Math.cos(keypoint.angle)) +
                Math.abs(Math.sin(keypoint.angle))));
        const cropWidth = rawWidth % 2 ? rawWidth : rawWidth + 1;
        const cropped = (0, extractSquareImage_1.extractSquareImage)(smoothed, keypoint.origin, cropWidth);
        const rotateCenter = cropped.getCoordinates(Image_1.ImageCoordinates.CENTER);
        const rotated = cropped.rotate(keypoint.angle, {
            center: rotateCenter,
            interpolationType: interpolatePixel_1.InterpolationType.NEAREST,
        });
        const cropOrigin = rotated.getCoordinates(Image_1.ImageCoordinates.CENTER);
        const patch = (0, extractSquareImage_1.extractSquareImage)(rotated, cropOrigin, patchSize);
        const descriptor = new Uint8Array(descriptorLength);
        for (let i = 0; i < descriptorLength; i++) {
            const p1 = gaussianPoints[i];
            const p2 = gaussianPoints[i + descriptorLength];
            descriptor[i] = Number((0, compareIntensity_1.compareIntensity)(patch, p1, p2));
        }
        descriptors.push(descriptor);
    }
    return descriptors;
}
exports.getBriefDescriptors = getBriefDescriptors;
//# sourceMappingURL=getBriefDescriptors.js.map