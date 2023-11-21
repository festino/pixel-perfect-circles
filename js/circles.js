function getCircle(mode, size) {
    if (mode == "default")
        return getDefaultCircle(size);
    else if (mode == "monotonous")
        return getDefaultCircle(size);
}

function getDefaultCircle(size) {
    const res = [];
    radius = size * 0.5;
    for (let i = 0; i < size; i++) {
        res[i] = [];
        for (let j = 0; j < size; j++) {
            y = i - radius + 0.5;
            x = j - radius + 0.5;
            res[i][j] = x * x + y * y <= radius * radius;
        }
    }
    return res;
}

function getNearestAreaCircle(size, monotonous) {
    lengthOptions = getLengthOptions(size, monotonous);
    minLengths = getOptimalLengths(size, lengthOptions);
    return getCircleFromLengths(size, minLengths);
}