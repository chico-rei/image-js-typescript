import { Image } from '../Image';
import { GaussianBlurOptions } from '../filters';
import { OrientedFastKeypoint } from './getOrientedFastKeypoints';
import { GetGaussianPointsOptions } from './utils/getGaussianPoints';
export interface GetBriefDescriptorsOptions {
    /**
     * Options to smooth the image patch before comparing pairs of points.
     */
    smoothingOptions?: GaussianBlurOptions;
    /**
     * Options to modify the gaussian distribution used to generate the points to compare.
     */
    pointsDistributionOptions?: Omit<GetGaussianPointsOptions, 'nbPoints'>;
    /**
     * Size of the patch around the keypoint used to compute the descriptor.
     *
     * @default 31
     */
    patchSize?: number;
    /**
     * Number of bits of the final descriptor.
     *
     * @default 256
     */
    descriptorLength?: 128 | 256 | 512;
}
export type BriefDescriptor = Uint8Array;
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
export declare function getBriefDescriptors(image: Image, keypoints: OrientedFastKeypoint[], options?: GetBriefDescriptorsOptions): BriefDescriptor[];
//# sourceMappingURL=getBriefDescriptors.d.ts.map