import { fromMask } from '../fromMask';
import { getMask } from '../getMask';
import { RoiKind } from '../getRois';

test('cross', () => {
  const mask = testUtils.createMask([
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0],
  ]);
  const roiMapManager = fromMask(mask);

  const rois = roiMapManager.getRois({ kind: RoiKind.WHITE });
  const roiMask = rois[0].getMask();
  expect(roiMask).toMatchMask(mask);
});

test('L', () => {
  const mask = testUtils.createMask([
    [0, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ]);
  const roiMapManager = fromMask(mask);

  const roi = roiMapManager.getRois({ kind: RoiKind.WHITE })[0];
  const roiMask = getMask(roi);

  expect(roiMask).toMatchMaskData([
    [1, 0],
    [1, 1],
  ]);
});

test('1 pixel ROI', () => {
  const mask = testUtils.createMask([
    [0, 0, 0],
    [0, 0, 1],
    [0, 0, 0],
  ]);
  const roiMapManager = fromMask(mask);

  const roi = roiMapManager.getRois({ kind: RoiKind.WHITE })[0];
  const roiMask = getMask(roi);

  expect(roiMask).toMatchMaskData([[1]]);
});

test('fill', () => {
  const mask = testUtils.createMask([
    [0, 1, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 1],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
  ]);
  const roiMapManager = fromMask(mask);

  const roi = roiMapManager.getRois({ kind: RoiKind.WHITE })[0];
  const roiMask = getMask(roi);

  expect(roiMask).toMatchMaskData([
    [1, 1, 0, 0],
    [1, 1, 1, 0],
    [1, 1, 1, 1],
    [1, 1, 1, 1],
  ]);
});

test('innerBorders false', () => {
  const mask = testUtils.createMask([
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ]);
  const roiMapManager = fromMask(mask);

  const roi = roiMapManager.getRois({ kind: RoiKind.WHITE })[0];
  const roiMask = getMask(roi, {
    innerBorders: false,
  });

  expect(roiMask).toMatchMaskData([
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
  ]);
});

test('innerBorders true', () => {
  const mask = testUtils.createMask([
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ]);
  const roiMapManager = fromMask(mask);

  const roi = roiMapManager.getRois({ kind: RoiKind.WHITE })[0];
  const roiMask = getMask(roi, {
    innerBorders: true,
  });

  expect(roiMask).toMatchMaskData([
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ]);
});

test('larger mask, innerBorders false', () => {
  const mask = testUtils.createMask([
    [0, 1, 1, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1],
    [0, 1, 1, 1, 0],
  ]);
  const roiMapManager = fromMask(mask);

  const roi = roiMapManager.getRois({ kind: RoiKind.WHITE })[0];
  const roiMask = getMask(roi, {
    innerBorders: false,
  });

  expect(roiMask).toMatchMaskData([
    [0, 1, 1, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
  ]);
});

test('allowCorners true', () => {
  const mask = testUtils.createMask([
    [1, 1, 1],
    [1, 0, 1],
    [0, 1, 1],
  ]);
  const roiMapManager = fromMask(mask);

  const roi = roiMapManager.getRois({ kind: RoiKind.WHITE })[0];
  const roiMask = getMask(roi, {
    allowCorners: true,
    innerBorders: false,
  });

  expect(roiMask).toMatchMaskData([
    [1, 1, 1],
    [1, 1, 1],
    [0, 1, 1],
  ]);
});

test('mask should have same origin as ROI', () => {
  const mask = testUtils.createMask([
    [0, 1, 1],
    [0, 0, 1],
    [0, 1, 1],
  ]);
  const roiMapManager = fromMask(mask);

  const roi = roiMapManager.getRois({ kind: RoiKind.WHITE })[0];
  const roiMask = roi.getMask();

  expect(roiMask.origin).toStrictEqual(roi.origin);
});
