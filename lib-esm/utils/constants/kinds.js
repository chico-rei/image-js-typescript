import { ImageColorModel } from '../../Image';
export const colorModelDefinitions = {
    [ImageColorModel.GREY]: {
        channels: 1,
        alpha: false,
    },
    [ImageColorModel.GREYA]: {
        channels: 2,
        alpha: true,
    },
    [ImageColorModel.RGB]: {
        channels: 3,
        alpha: false,
    },
    [ImageColorModel.RGBA]: {
        channels: 4,
        alpha: true,
    },
};
//# sourceMappingURL=kinds.js.map