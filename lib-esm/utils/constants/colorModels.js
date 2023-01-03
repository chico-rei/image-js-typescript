export var ImageColorModel;
(function (ImageColorModel) {
    ImageColorModel["GREY"] = "GREY";
    ImageColorModel["GREYA"] = "GREYA";
    ImageColorModel["RGB"] = "RGB";
    ImageColorModel["RGBA"] = "RGBA";
    ImageColorModel["BINARY"] = "BINARY";
})(ImageColorModel || (ImageColorModel = {}));
export const colorModels = {
    [ImageColorModel.GREY]: {
        components: 1,
        alpha: false,
        channels: 1,
    },
    [ImageColorModel.GREYA]: {
        components: 1,
        alpha: true,
        channels: 2,
    },
    [ImageColorModel.RGB]: {
        components: 3,
        alpha: false,
        channels: 3,
    },
    [ImageColorModel.RGBA]: {
        components: 3,
        alpha: true,
        channels: 4,
    },
    [ImageColorModel.BINARY]: {
        components: 1,
        alpha: false,
        channels: 1,
    },
};
//# sourceMappingURL=colorModels.js.map