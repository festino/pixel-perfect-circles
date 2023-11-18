from math import pi

import pytest

from pixel_perfect_circles.circle import get_cell_intersection_area, get_circle_min_area_deviation
from pixel_perfect_circles.length_utils import get_circle_by_lengths


@pytest.mark.parametrize("filter_monotonous", [True, False])
def test_get_circle_min_area_deviation(filter_monotonous):
    assert get_circle_min_area_deviation(1, filter_monotonous) == [[True]]
    assert get_circle_min_area_deviation(2, filter_monotonous) == [[True, True],
                                                                   [True, True]]
    assert get_circle_min_area_deviation(3, filter_monotonous) == [[True, True, True],
                                                                   [True, True, True],
                                                                   [True, True, True]]
    # assert get_circle_min_area_deviation(3, filter_monotonous) == [[False, True, False],
    #                                                                [True, True, True],
    #                                                                [False, True, False]]


def test_get_circle_min_area_deviation_monotonous():
    assert get_circle_min_area_deviation(27, False) == get_circle_by_lengths(27, [4, 3, 1, 2])
    assert get_circle_min_area_deviation(27, True) == get_circle_by_lengths(27, [4, 3, 1, 1, 1])


def test_get_cell_intersection_area():
    assert get_cell_intersection_area(10, 5 + 2, 5 + 3) == pytest.approx(1.0)
    assert get_cell_intersection_area(10, 5 + 3, 5 + 4) == pytest.approx(0.0)
    assert get_cell_intersection_area(3, 0, 0) == get_cell_intersection_area(3, 0, 2)
    assert get_cell_intersection_area(3, 0, 0) == get_cell_intersection_area(3, 2, 2)
    assert get_cell_intersection_area(3, 0, 0) == get_cell_intersection_area(3, 2, 0)
    assert get_cell_intersection_area(3, 1, 0) == get_cell_intersection_area(3, 0, 1)
    assert get_cell_intersection_area(3, 1, 0) == get_cell_intersection_area(3, 1, 2)
    assert get_cell_intersection_area(3, 1, 0) == get_cell_intersection_area(3, 2, 1)
    assert get_cell_intersection_area(3, 1, 1) == pytest.approx(1.0)
    assert 0.9 < get_cell_intersection_area(3, 1, 0) < 1.0


def test_get_cell_intersection_area_sum():
    for size in range(1, 100):
        sum_area = _sum_circle_area(size)
        print(size, ":", sum_area, pi * (size / 2.0) ** 2)
        assert sum_area == pytest.approx(pi * (size / 2.0) ** 2)


def _sum_circle_area(circle_size: int) -> float:
    sum_area = 0.0
    for i in range(circle_size):
        for j in range(circle_size):
            area = get_cell_intersection_area(circle_size, i, j)
            sum_area += area
            assert 0.0 <= area <= 1.0

    return sum_area
