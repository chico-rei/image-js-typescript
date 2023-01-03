"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawPolylineOnMask = void 0;
const getOutputImage_1 = require("../utils/getOutputImage");
/**
 * Draw a polyline defined by an array of points on an image.
 *
 * @param mask - Mask to process.
 * @param points - Polyline array of points.
 * @param options - Draw polyline options.
 * @returns The mask with the polyline drawing.
 */
function drawPolylineOnMask(mask, points, options = {}) {
    let newImage = (0, getOutputImage_1.maskToOutputMask)(mask, options, { clone: true });
    for (let i = 0; i < points.length - 1; i++) {
        const from = points[i];
        const to = points[i + 1];
        newImage.drawLine(from, to, { out: newImage, origin: options.origin });
    }
    return newImage;
}
exports.drawPolylineOnMask = drawPolylineOnMask;
//# sourceMappingURL=drawPolylineOnMask.js.map