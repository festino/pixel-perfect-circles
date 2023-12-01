function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runAllTestCases() {
    const testCases = [
        { name: "getDefaultLengths", function: test_getDefaultLengths },
        { name: "getLengthOptions", function: test_getLengthOptions },
        { name: "getLengthOptions (monotonous)", function: test_getLengthOptions_monotonous },
        { name: "getOptimalLengthsSlow", function: test_getOptimalLengthsSlow },
        { name: "getOptimalLengths (comparing Slow)", function: test_getOptimalLengths_bySlow },
    ];

    let totalTestStatus = true;
    for (const testCase of testCases) {
        testStatus = testCase.function();
        iconStatus = testStatus ? ">" : "x";
        textStatus = testStatus ? "PASSED" : "FAILED";
        document.getElementById("test-info").textContent += iconStatus + " " + testCase.name + ": " + textStatus + "\n";
        totalTestStatus = totalTestStatus && testStatus;
        await sleep(5);
    }
    document.getElementById("test-status").textContent = totalTestStatus ? "Tests: PASSED" : "Tests: FAILED (View the console)";
}

runAllTestCases();
