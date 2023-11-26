

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