"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./erode"), exports);
__exportStar(require("./dilate"), exports);
__exportStar(require("./open"), exports);
__exportStar(require("./close"), exports);
__exportStar(require("./topHat"), exports);
__exportStar(require("./bottomHat"), exports);
__exportStar(require("./morphologicalGradient"), exports);
__exportStar(require("./clearBorder"), exports);
__exportStar(require("./cannyEdgeDetector"), exports);
__exportStar(require("./floodFill"), exports);
__exportStar(require("./solidFill"), exports);
//# sourceMappingURL=index.js.map