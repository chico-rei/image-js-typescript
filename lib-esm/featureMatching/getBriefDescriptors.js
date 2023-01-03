import { ImageColorModel, ImageCoordinates } from '../Image';
import checkProcessable from '../utils/checkProcessable';
import { InterpolationType } from '../utils/interpolatePixel';
import { compareIntensity } from './utils/compareIntensity';
import { extractSquareImage } from './utils/extractSquareImage';
import { getGaussianPoints, } from './utils/getGaussianPoints';
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
export function getBriefDescriptors(image, keypoints, options = {}) {
    const { patchSize = 31, descriptorLength = 256, smoothingOptions = { sigma: Math.sqrt(2), size: 9 }, pointsDistributionOptions, } = options;
    checkProcessable(image, 'getBriefDescriptors', {
        alpha: false,
        colorModel: ImageColorModel.GREY,
    });
    if (!(patchSize % 2)) {
        throw new Error('getBriefDescriptors: patchSize should be an odd integer');
    }
    const gaussianPoints = getGaussianPoints(patchSize, patchSize, {
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
        const cropped = extractSquareImage(smoothed, keypoint.origin, cropWidth);
        const rotateCenter = cropped.getCoordinates(ImageCoordinates.CENTER);
        const rotated = cropped.rotate(keypoint.angle, {
            center: rotateCenter,
            interpolationType: InterpolationType.NEAREST,
        });
        const cropOrigin = rotated.getCoordinates(ImageCoordinates.CENTER);
        const patch = extractSquareImage(rotated, cropOrigin, patchSize);
        const descriptor = new Uint8Array(descriptorLength);
        for (let i = 0; i < descriptorLength; i++) {
            const p1 = gaussianPoints[i];
            const p2 = gaussianPoints[i + descriptorLength];
            descriptor[i] = Number(compareIntensity(patch, p1, p2));
        }
        descriptors.push(descriptor);
    }
    return descriptors;
}
//# sourceMappingURL=getBriefDescriptors.js.map