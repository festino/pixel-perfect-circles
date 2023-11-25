// import {
// 	"getLengthOptions" as getLengthOptions,
// 	"getOptimalLengths" as getOptimalLengths,
// 	"getCircleFromLengths" as getCircleFromLengths
// } from "/js/length-utils.js";

const pixelCircleImage = document.getElementById("circle-1-image");
const ctx = pixelCircleImage.getContext("2d");
const comparisonSvg = document.getElementById("circle-comparison");
const comparisonSvgDefs = comparisonSvg.getElementsByTagName("defs")[0];
const comparisonSvgMask = comparisonSvg.getElementById("second-shape");
const svgns = "http://www.w3.org/2000/svg";

function redrawCircles() {
	size = parseInt(sizeSlider.value);
	mode = document.querySelector('input[name="circle-1-choice"]:checked')?.value;
	mode2 = document.querySelector('input[name="circle-2-choice"]:checked')?.value;
	grid1 = getCircle(mode, size);
	drawCopyable(grid1);
	drawComparison(grid1, mode2);
}

function drawComparison(grid1, mode2) {
	size = grid1.length;

	while (comparisonSvg.lastChild != comparisonSvgDefs)
		comparisonSvg.removeChild(comparisonSvg.lastChild);
	while (comparisonSvgMask.lastChild)
		comparisonSvgMask.removeChild(comparisonSvgMask.lastChild);
	comparisonSvg.setAttribute("viewBox", "0 0 " + size + " " + size);

	if (mode2 == "ideal") {
		secondShape = getIdealCircleSvg(size);
	}
	else {
		grid2 = getCircle(mode2, size);
		secondShape = getCircleSvg(grid2);
	}
	secondShape.setAttributeNS(null, 'style', 'fill: #ffffff;');
	comparisonSvgMask.appendChild(secondShape);

	// red mainShape
	mainShape = getCircleSvg(grid1);
	mainShape.setAttributeNS(null, 'style', 'fill: #ff0000;');
	comparisonSvg.appendChild(mainShape);
	// green all mask secondShape
	mainShape = getRectSvg(size)
	mainShape.setAttributeNS(null, 'style', 'fill: #00ff00;');
	mainShape.setAttributeNS(null, 'mask', 'url(#second-shape)');
	comparisonSvg.appendChild(mainShape);
	// black mainShape mask secondShape
	mainShape = getCircleSvg(grid1);
	mainShape.setAttributeNS(null, 'style', 'fill: #000000;');
	mainShape.setAttributeNS(null, 'mask', 'url(#second-shape)');
	comparisonSvg.appendChild(mainShape);
}

function drawCopyable(grid) {
	grid = getBorderGrid(grid);
	size = grid.length;
	pixelCircleImage.width = size;
	pixelCircleImage.height = size;
	const imageData = ctx.createImageData(size, size);
	const data = imageData.data;
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			index = 4 * (i * size + j);
			color = grid[i][j] ? 0x000000ff : 0xffffffff;
			data[index] = color >> 24 & 0xff;
			data[index + 1] = color >> 16 & 0xff;
			data[index + 2] = color >> 8 & 0xff;
			data[index + 3] = color & 0xff;
		}
	}
	ctx.putImageData(imageData, 0, 0);
}

function getIdealCircleSvg(size) {
	var circle = document.createElementNS(svgns, 'circle');
	circle.setAttributeNS(null, 'cx', size * 0.5);
	circle.setAttributeNS(null, 'cy', size * 0.5);
	circle.setAttributeNS(null, 'r', size * 0.5);
	return circle;
}

function getRectSvg(size) {
	var rect = document.createElementNS(svgns, 'rect');
	rect.setAttribute('x', '0');
	rect.setAttribute('y', '0');
	rect.setAttribute('height', size);
	rect.setAttribute('width', size);
	return rect;
}

function getCircleSvg(grid) {
	var polygon = document.createElementNS(svgns, "polygon");
	var array = getBorderPoints(grid);

	for (value of array) {
		var point = comparisonSvg.createSVGPoint();
		point.x = value[0];
		point.y = value[1];
		polygon.points.appendItem(point);
	}
	return polygon;
}

updateSize(sizeSlider.value);