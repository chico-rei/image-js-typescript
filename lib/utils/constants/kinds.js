"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorModelDefinitions = void 0;
const Image_1 = require("../../Image");
exports.colorModelDefinitions = {
    [Image_1.ImageColorModel.GREY]: {
        channels: 1,
        alpha: false,
    },
    [Image_1.ImageColorModel.GREYA]: {
        channels: 2,
        alpha: true,
    },
    [Image_1.ImageColorModel.RGB]: {
        channels: 3,
        alpha: false,
    },
    [Image_1.ImageColorModel.RGBA]: {
        channels: 4,
        alpha: true,
    },
};
//# sourceMappingURL=kinds.js.map