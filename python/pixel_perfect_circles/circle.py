from math import sqrt, pi, asin, floor
from typing import List

from pixel_perfect_circles.length_utils import get_lengths_options, get_circle_by_lengths, filter_monotonous_lengths


def get_default_circle(size: int) -> List[List[bool]]:
    radius = size / 2.0
    radius_squared = radius ** 2
    grid = []
    for i in range(size):
        line: List[bool] = []
        grid.append(line)
        for j in range(size):
            dist_squared = (i - radius + 0.5) ** 2 + (j - radius + 0.5) ** 2
            line.append(True if dist_squared <= radius_squared else False)

    return grid


def get_cell_intersection_area(size: int, i: int, j: int) -> float:
    if size == 1:
        return pi / 4.0 if i == 0 and j == 0 else 0.0

    radius = size / 2.0
    i = floor(abs(i - (size - 1) / 2.0))
    j = floor(abs(j - (size - 1) / 2.0))
    offset = -0.5 if size % 2 == 1 else 0.0
    left_x, left_y = i + offset, j + offset
    right_x, right_y = left_x + 1, left_y + 1
    if right_x ** 2 + right_y ** 2 <= radius ** 2:
        return 1.0

    if left_x ** 2 + left_y ** 2 >= radius ** 2:
        return 0.0

    x1 = max(left_x, sqrt(radius ** 2 - right_y ** 2)) if left_x > 0 else left_x
    y1 = max(left_y, sqrt(radius ** 2 - right_x ** 2)) if left_y > 0 else left_y
    x2 = min(right_x, sqrt(radius ** 2 - y1 ** 2)) if left_x > 0 else right_x
    y2 = min(right_y, sqrt(radius ** 2 - x1 ** 2)) if left_y > 0 else right_y
    dx, dy = x2 - x1, y2 - y1
    angle = 2 * asin(sqrt(dx ** 2 + dy ** 2) * 0.5 / radius)
    area = 0.5 * angle * radius ** 2 - 0.5 * (abs(x1) * dy + abs(y1) * dx)
    return area + (y1 - left_y) * (right_x - x1) + (x1 - left_x) * (right_y - left_y)


def get_area_deviation(size: int, grid: List[List[bool]]) -> float:
    value = 0.0
    for i, line in enumerate(grid):
        for j, cell in enumerate(line):
            area = get_cell_intersection_area(size, i, j)
            value += 1.0 - area if cell else area
            # print(i, j, area)

    return value


def get_circle_min_area_deviation(size: int, filter_monotonous: bool) -> List[List[bool]]:
    arc_length = (size + 1) // 2
    options = get_lengths_options(arc_length)
    if filter_monotonous:
        options = filter_monotonous_lengths(options)

    best_grid = []
    best_value = float("+inf")
    for option in options:
        grid = get_circle_by_lengths(size, option)
        value = get_area_deviation(size, grid)
        # print(value, option)
        if value < best_value:
            best_value = value
            best_grid = grid
            # print(render_grid(best_grid))

    return best_grid
