"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractSquareImage = void 0;
/**
 * Crop the source image to given dimensions around the origin.
 *
 * @param image - Source image.
 * @param origin - Center point for the crop.
 * @param patchSize - Size of the returned image.
 * @returns The square image around the origin extracted from the source image.
 */
function extractSquareImage(image, origin, patchSize) {
    const cropOffset = (patchSize - 1) / 2;
    const cropOrigin = {
        column: origin.column - cropOffset,
        row: origin.row - cropOffset,
    };
    return image.crop({
        origin: cropOrigin,
        width: patchSize,
        height: patchSize,
    });
}
exports.extractSquareImage = extractSquareImage;
//# sourceMappingURL=extractSquareImage.js.map