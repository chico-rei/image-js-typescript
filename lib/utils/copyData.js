"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyData = void 0;
/**
 * Copy the data of an source to the target image.
 *
 * @param source - Image which data is copied.
 * @param target - Image to which the data must be copied.
 */
function copyData(source, target) {
    if (target.width !== source.width ||
        target.height !== source.height ||
        target.colorModel !== source.colorModel) {
        throw new Error('copyData: images width, height or color model is different');
    }
    // @ts-expect-error Accessing data, which is private
    target.data = source.data.slice();
}
exports.copyData = copyData;
//# sourceMappingURL=copyData.js.map