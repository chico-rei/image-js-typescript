import { IJS } from '../../IJS';

describe('drawPolygon on IJS', () => {
  it.only('RGB image', () => {
    const image = testUtils.createRgbImage([
      [100, 150, 200, 100, 150, 0],
      [100, 200, 5, 3, 200, 0],
      [150, 200, 255, 6, 150, 0],
    ]);
    const points = [
      { row: 0, column: 0 },
      { row: 1, column: 1 },
    ];
    const result = image.drawPolygon(points, { color: [255, 0, 0] });
    expect(result).toMatchImageData([
      [255, 0, 0, 100, 150, 0],
      [100, 200, 5, 255, 0, 0],
      [150, 200, 255, 6, 150, 0],
    ]);
    expect(result).not.toBe(image);
  });
  it('out parameter set to self', () => {
    const image = testUtils.createRgbImage([
      [100, 150, 200, 100, 150, 0],
      [100, 200, 5, 3, 200, 0],
      [150, 200, 255, 6, 150, 0],
    ]);
    const points = [
      { row: 0, column: 0 },
      { row: 1, column: 1 },
      { row: 2, column: 0 },
    ];
    const result = image.drawPolygon(points, {
      color: [255, 0, 0],
      out: image,
    });

    expect(result).toMatchImageData([
      [255, 0, 0, 100, 150, 0],
      [255, 0, 0, 255, 0, 0],
      [255, 0, 0, 6, 150, 0],
    ]);
    expect(result).toBe(image);
  });
  it('out to other image', () => {
    const out = new IJS(2, 3);
    const image = testUtils.createRgbImage([
      [100, 150, 200, 100, 150, 0],
      [100, 200, 5, 3, 200, 0],
      [150, 200, 255, 6, 150, 0],
    ]);
    const points = [
      { row: 0, column: 0 },
      { row: 1, column: 1 },
      { row: 2, column: 0 },
    ];
    const result = image.drawPolygon(points, {
      color: [255, 0, 0],
      out,
    });

    expect(result).toMatchImageData([
      [255, 0, 0, 100, 150, 0],
      [255, 0, 0, 255, 0, 0],
      [255, 0, 0, 6, 150, 0],
    ]);
    expect(result).toBe(out);
    expect(result).not.toBe(image);
  });
  it('drawPolygon with no points', () => {
    const image = testUtils.createRgbImage([
      [100, 150, 200, 100, 150, 0],
      [100, 200, 5, 3, 200, 0],
      [150, 200, 255, 6, 150, 0],
    ]);
    const result = image.drawPolygon([], {
      color: [255, 0, 0],
    });

    expect(result).toMatchImage(image);
    expect(result).not.toBe(image);
  });
  it('grey image', () => {
    const image = testUtils.createGreyImage([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    const points = [
      { row: 0, column: 0 },
      { row: 3, column: 3 },
      { row: 3, column: 0 },
    ];
    const result = image.drawPolygon(points, {
      color: [1],
      fill: [2],
      filled: true,
    });
    expect(result).toMatchImageData([
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [1, 2, 1, 0],
      [1, 1, 1, 1],
    ]);
    expect(result).not.toBe(image);
  });
  it.only('should handle duplicate points', () => {
    const image = testUtils.createGreyImage([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    const points = [
      { row: 0, column: 0 },
      { row: 0, column: 0 },
      { row: 3, column: 3 },
      { row: 3, column: 0 },
      { row: 3, column: 0 },
    ];
    const result = image.drawPolygon(points, {
      color: [1],
      fill: [2],
      filled: true,
    });

    console.log(result);
    expect(result).toMatchImageData([
      [1, 0, 0, 0],
      [1, 1, 0, 0],
      [1, 2, 1, 0],
      [1, 1, 1, 1],
    ]);
    expect(result).not.toBe(image);
  });
});