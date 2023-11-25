function getBorderGrid(grid, thicc = false) {
    var border = [];
    for (let i = 0; i < grid.length; i++) {
        border[i] = [];
        for (let j = 0; j < grid[i].length; j++) {
            isHorizontalEdge = i - 1 < 0 || !grid[i - 1][j] || i + 1 >= grid.length || !grid[i + 1][j];
            isVerticalEdge = j - 1 < 0 || !grid[i][j - 1] || j + 1 >= grid[i].length || !grid[i][j + 1];
            isDiagonalEdge = thicc && (isHorizontalEdge || isVerticalEdge
                || !grid[i - 1][j - 1] || !grid[i + 1][j - 1] || !grid[i - 1][j + 1] || !grid[i + 1][j + 1]);
            border[i][j] = grid[i][j] && (isHorizontalEdge || isVerticalEdge || isDiagonalEdge);
        }
    }
    return border;
}

function getBorderPoints(grid) {
    epsilon = 0.1;
    size = grid.length;
    if (size == 1)
        return [[0, 0], [1, 0], [1, 1], [0, 1]];

    array = [[size * 0.5, 0]];
    while (array[array.length - 1][0] < size - epsilon) {
        prevPoint = array[array.length - 1];
        cellX = Math.floor(prevPoint[0] + epsilon);
        cellY = Math.floor(prevPoint[1] + epsilon);
        while (cellX + 1 < size && grid[cellX + 1][cellY]) {
            cellX++;
        }
        array.push([cellX + 1, cellY]);
        while (cellY + 1 < size && cellX + 1 < size && !grid[cellX + 1][cellY]) {
            cellY++;
        }
        array.push([cellX + 1, cellY]);
    }

    length = array.length;
    for (let k = 0; k < 3; k++) {
        for (let i = length * k; i < length * (k + 1); i++)
            array[i + length] = [size - array[i][1], array[i][0]];
    }
    return array;
}

function getCellIntersectionArea(size, i, j) {
    if (size == 1)
        return i == 0 && j == 0 ? Math.PI / 4.0 : 0.0;

    let radius = size / 2.0;
    i = Math.floor(Math.abs(i - (size - 1) / 2.0));
    j = Math.floor(Math.abs(j - (size - 1) / 2.0));
    let offset = size % 2 == 1 ? -0.5 : 0.0;
    let left_x = i + offset;
    let left_y = j + offset;
    let right_x = left_x + 1;
    let right_y = left_y + 1;
    if (right_x * right_x + right_y * right_y <= radius * radius)
        return 1.0;

    if (left_x * left_x + left_y * left_y >= radius * radius)
        return 0.0;

    let x1 = left_x > 0 ? Math.max(left_x, Math.sqrt(radius * radius - right_y * right_y)) : left_x;
    let y1 = left_y > 0 ? Math.max(left_y, Math.sqrt(radius * radius - right_x * right_x)) : left_y;
    let x2 = left_x > 0 ? Math.min(right_x, Math.sqrt(radius * radius - y1 * y1)) : right_x;
    let y2 = left_y > 0 ? Math.min(right_y, Math.sqrt(radius * radius - x1 * x1)) : right_y;
    let dx = x2 - x1;
    let dy = y2 - y1;
    let angle = 2 * Math.asin(Math.sqrt(dx * dx + dy * dy) * 0.5 / radius);
    let area = 0.5 * angle * radius * radius - 0.5 * (Math.abs(x1) * dy + Math.abs(y1) * dx);
    return area + (y1 - left_y) * (right_x - x1) + (x1 - left_x) * (right_y - left_y);
}


function getAreaDeviation(size, grid) {
    let value = 0.0;
    for (let i = 0; i < grid.length; i++) {
        let line = grid[i];
        for (let j = 0; j < grid.length; j++) {
            let cell = line[j];
            let area = getCellIntersectionArea(size, i, j);
            value += cell ? 1.0 - area : area;
        }
    }

    return value;
}