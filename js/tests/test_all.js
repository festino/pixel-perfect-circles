function arrayEquals(a, b) {
	if (Array.isArray(a) && Array.isArray(b))
		return a.length === b.length && a.every((val, index) => arrayEquals(val, b[index]));
	return a === b;

}

function test_getDefaultLengths() {
	let testStatus = true;
	for (let size = 1; size <= 300; size++) {
		let lengths = getDefaultLengths(size);
		if (!arrayEquals(getCircleByLengths(size, lengths), getDefaultCircle(size))) {
			console.log("x test_getDefaultLengths (" + size + "): " + lengths);
			testStatus = false;
		}
	}
	return testStatus;
}

function test_getLengthOptions() {
	let testStatus = true;
	for (let size = 1; size <= 30; size++) {
		let lengthsOptions = getLengthOptions(size, false);
		for (const lengths of lengthsOptions) {
			if (!isPossibleLengths(Math.floor((size + 1) / 2), lengths)) {
				console.log("x test_getLengthOptions (" + size + "): " + lengths);
				testStatus = false;
			}
		}
	}
	return testStatus;
}

function test_getLengthOptions_monotonous() {
	let testStatus = true;
	for (let size = 1; size <= 30; size++) {
		let lengthsOptions = getLengthOptions(size, true);
		for (const lengths of lengthsOptions) {
			if (!isPossibleLengths(Math.floor((size + 1) / 2), lengths)) {
				console.log("x test_getLengthOptions_monotonous (" + size + "): " + lengths);
				testStatus = false;
			}
			if (!isMonotonousLengths(lengths)) {
				console.log("x test_getLengthOptions_monotonous (" + size + "): " + lengths);
				testStatus = false;
			}
		}
	}
	return testStatus;
}

function test_getOptimalLengthsSlow() {
	let testStatus = true;
	for (let size = 1; size <= 28; size++) {
		let lengthsOptions = getLengthOptions(size, true);
		let lengths = getOptimalLengthsSlow(size, lengthsOptions);
		let lengthsExpected = getDefaultLengths(size);
		if ((!arrayEquals(lengths, lengthsExpected)) !== (size === 27)) {
			console.log("x test_getOptimalLengthsSlow (" + size + "): " + lengths + " !== " + lengthsExpected);
			testStatus = false;
		}
	}
	return testStatus;
}

function test_getOptimalLengths_bySlow() {
	let testStatus = true;
	for (let size = 1; size <= 60; size++) {
		let lengths = getOptimalLengths(size);
		let lengthsOptions = getLengthOptions(size, true);
		let lengthsExpected = getOptimalLengthsSlow(size, lengthsOptions);
		if (!arrayEquals(lengths, lengthsExpected)) {
			console.log("x test_getOptimalLengths_bySlow (" + size + "): " + lengths + " !== " + lengthsExpected);
			testStatus = false;
		}
	}
	return testStatus;
}
