export declare enum ImageColorModel {
    GREY = "GREY",
    GREYA = "GREYA",
    RGB = "RGB",
    RGBA = "RGBA",
    BINARY = "BINARY"
}
export declare const colorModels: {
    [key in ImageColorModel]: {
        components: number;
        alpha: boolean;
        channels: number;
    };
};
//# sourceMappingURL=colorModels.d.ts.map