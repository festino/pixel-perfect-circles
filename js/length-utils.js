const lengthsCache = new Map();

function getOptimalLengthsSlow(size, lengthOptions) {
	let minAreaDeviation = +Infinity;
	let minLengths = lengthOptions[0];
	for (const lengths of lengthOptions) {
		let areaDeviation = getAreaDeviationByLengths(size, lengths);
		if (areaDeviation < minAreaDeviation) {
			minAreaDeviation = areaDeviation;
			minLengths = lengths;
		}
	}
	return minLengths;
}

function getOptimalLengths(size, startLengths) {
	let initLengths = startLengths.sort((a, b) => b - a);
	let initAreaDeviation = getAreaDeviationByLengths(size, initLengths);
	let minInfo = { minLengths: initLengths, minAreaDeviation: initAreaDeviation };
	let lengths = [];
	while (lengths.length !== minInfo.minLengths.length || lengths.some((val, i, arr) => val !== minInfo.minLengths[i])) {
		lengths = minInfo.minLengths;

		let addIndices = [];
		let subtractIndices = [];
		for (let i = 0; i < lengths.length; i++) {
			if (i == 0 || lengths[i - 1] > lengths[i]) {
				addIndices.push(i);
			}
			if ((i == lengths.length - 1 || lengths[i] > lengths[i + 1]) && lengths[i] != 1) {
				subtractIndices.push(i);
			}
		}

		for (let i of addIndices) {
			lengths[i]++;
			tryUpdateMinAreaDeviation(size, lengths, minInfo);

			if (lengths[lengths.length - 1] == 1) {
				lengths.pop();
				tryUpdateMinAreaDeviation(size, lengths, minInfo);
				lengths.push(1);
			}

			for (let j of subtractIndices) {
				if (i >= j)
					continue;

				lengths[j]--;
				if (lengths[j] == 0)
					lengths.pop();

				tryUpdateMinAreaDeviation(size, lengths, minInfo);

				if (j >= lengths.length)
					lengths.push(0);
				lengths[j]++;
			}
			lengths[i]--;
		}
		for (let i of subtractIndices) {
			lengths[i]--;
			tryUpdateMinAreaDeviation(size, lengths, minInfo);

			lengths.push(1);
			tryUpdateMinAreaDeviation(size, lengths, minInfo);
			lengths.pop();

			for (let j of addIndices) {
				if (i >= j)
					continue;

				lengths[j]++;
				if (isMonotonousLengths(lengths)) {
					tryUpdateMinAreaDeviation(size, lengths, minInfo);
				}
				lengths[j]--;
			}
			lengths[i]++;
		}
		console.log(size + ": " + minInfo.minLengths + " vs " + lengths);
	}
	return minInfo.minLengths;
}

function getAreaDeviationByLengths(size, lengths) {
	return getAreaDeviation(size, getCircleByLengths(size, lengths));
}

function getCircleByLengths(size, lengths) {
	let arcSize = Math.floor((size + 1) / 2);
	let hasIntersectionCell = hasIntersection(arcSize, lengths);
	let actualSize = getActualSize(arcSize, lengths);
	if (actualSize != arcSize) {
		console.log("Could not get grid by lengths, " + actualSize + " != " + arcSize);
		return [];
	}

	let grid = [];
	let sumLength = -(size % 2);
	for (const length of lengths) {
		sumLength += length * 2;
		let line = getGridLine(size, sumLength);
		grid.push(line);
	}

	for (let i = 0; i < lengths.length; i++) {
		let length = lengths[lengths.length - 1 - i];
		if (hasIntersectionCell && i == 0) {
			length -= 1;
			if (length == 0)
				continue;
		}
		else {
			sumLength += 2;
		}

		let line = getGridLine(size, sumLength);
		for (let j = 0; j < length; j++)
			grid.push(line);
	}

	for (let i = Math.floor(size / 2) - 1; i >= 0; i--)
		grid.push(grid[i]);

	return grid;
}

function getGridLine(size, sumLength) {
	let emptyLength = Math.floor((size - sumLength) / 2);
	let line = [];
	for (let i = 0; i < size; i++) {
		line.push(i >= emptyLength && i < size - emptyLength);
	}

	return line;
}

function getDefaultLengths(size) {
	if (size <= 2)
		return [1];

	let radius = size / 2;
	let i = 0;
	let j = Math.floor(size / 2 - 1);
	let res = [];
	while (true) {
		let y = i - radius + 0.5;
		let maxX = Math.sqrt(radius * radius - y * y);
		let max_j = Math.floor(maxX + radius - 0.5);
		// console.log(size, i, j, max_j, maxX, y);
		if (y >= 0.0 || size - max_j <= i)
			break;

		res.push(max_j - j);
		j = max_j;
		i += 1;
	}
	return res;
}

function getLengthOptions(size, monotonous) {
	let arcSize = Math.floor((size + 1) / 2);
	let options = _getLengthOptions(arcSize);
	if (!monotonous)
		return options;

	let res = [];
	for (const option of options)
		if (isMonotonousLengths(option))
			res.push(option);

	return res;
}


function _getLengthOptions(remainingLength) {
	if (remainingLength <= 0)
		return [[]];

	if (remainingLength == 1)
		return [[1]];

	if (lengthsCache.has(remainingLength)) {
		return lengthsCache.get(remainingLength);
	}

	let result = [[remainingLength]];
	for (let length = remainingLength - 1; length >= 1; length--) {
		for (const lengths of _getLengthOptions(remainingLength - length - 1)) {
			let newLengths = [length];
			newLengths.push(...lengths);
			result.push(newLengths);
		}
	}

	lengthsCache.set(remainingLength, result);
	return result;
}

function isPossibleLengths(arcSize, lengths) {
	let actualSize = getActualSize(arcSize, lengths);
	return actualSize == arcSize;
}

function isMonotonousLengths(lengths) {
	let prevLength = lengths[0];
	for (const length of lengths) {
		if (length > prevLength)
			return false;

		prevLength = length;
	}

	return true;
}

function hasIntersection(arcSize, lengths) {
	return sum(lengths) == arcSize - lengths.length + 1;
}

function getActualSize(arcSize, lengths) {
	let intersectionCells = hasIntersection(arcSize, lengths) ? 1 : 0;
	let actualSize = sum(lengths) + lengths.length - intersectionCells;
	return actualSize;
}

function sum(numberArray) {
	return numberArray.reduce((accumulator, currentValue) => {
		return accumulator + currentValue
	}, 0);
}

function tryUpdateMinAreaDeviation(size, lengths, minInfo) {
	let arcSize = Math.floor((size + 1) / 2);
	if (isPossibleLengths(arcSize, lengths)) {
		let areaDeviation = getAreaDeviationByLengths(size, lengths);
		if (areaDeviation < minInfo.minAreaDeviation) {
			minInfo.minAreaDeviation = areaDeviation;
			minInfo.minLengths = [...lengths];
		}
	}

}