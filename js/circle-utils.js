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