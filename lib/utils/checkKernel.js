"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkKernel = void 0;
/**
 * Checks the that the dimensions of the kernel are odd.
 *
 * @param kernel - Kernel passed to a morphology function.
 * @param functionName - Name of the function.
 */
function checkKernel(kernel, functionName) {
    if (kernel.length % 2 === 0 || kernel[0].length % 2 === 0) {
        throw new TypeError(`${functionName}: The number of rows and columns of the kernel must be odd`);
    }
}
exports.checkKernel = checkKernel;
//# sourceMappingURL=checkKernel.js.map