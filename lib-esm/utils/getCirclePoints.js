import { circle } from 'bresenham-zingl';
/**
 * Get the coordinates of the points on a circle. The reference is the center of the circle.
 * The first point is the right one and they are then sorted clockwise.
 *
 * @param radius - Radius of the circle.
 * @returns The coordinates of the points on a circle of given diameter.
 */
export function getCirclePoints(radius) {
    let circlePoints = [];
    circle(radius, radius, radius, (column, row) => {
        circlePoints.push({ row: row - radius, column: column - radius });
    });
    let firstQuarter = [];
    let secondQuarter = [];
    let thirdQuarter = [];
    let fourthQuarter = [];
    for (let i = 0; i < circlePoints.length; i = i + 4) {
        firstQuarter.push(circlePoints[i % circlePoints.length]);
        secondQuarter.push(circlePoints[(i + 1) % circlePoints.length]);
        thirdQuarter.push(circlePoints[(i + 2) % circlePoints.length]);
        fourthQuarter.push(circlePoints[(i + 3) % circlePoints.length]);
    }
    return firstQuarter.concat(secondQuarter, thirdQuarter, fourthQuarter);
}
/**
 * Get the coordinates of the points that are on right, bottom, left and top at a given radius. The reference is the center of the circle.
 * First point is the most on the right, then points are in clockwise order.
 *
 * @param radius - Radius of the circle.
 * @returns The coordinates of the compass points.
 */
export function getCompassPoints(radius) {
    let circlePoints = [];
    circle(radius, radius, radius, (column, row) => {
        circlePoints.push({ row: row - radius, column: column - radius });
    });
    return [
        { row: 0, column: radius },
        { row: radius, column: 0 },
        { row: 0, column: -radius },
        { row: -radius, column: 0 },
    ];
}
//# sourceMappingURL=getCirclePoints.js.map