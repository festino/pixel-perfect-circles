function getCircle(mode, size) {
    if (mode == "default")
        return getDefaultCircle(size);
    else if (mode == "monotonous")
        return getNearestAreaCircle(size, true);
}

function getDefaultCircle(size) {
    const res = [];
    let radius = size * 0.5;
    for (let i = 0; i < size; i++) {
        res[i] = [];
        for (let j = 0; j < size; j++) {
            let y = i - radius + 0.5;
            let x = j - radius + 0.5;
            res[i][j] = x * x + y * y <= radius * radius;
        }
    }
    return res;
}

function getNearestAreaCircle(size, monotonous) {
    let lengthOptions = getLengthOptions(size, monotonous);
    let minLengths = getOptimalLengths(size, lengthOptions);
    return getCircleByLengths(size, minLengths);
}