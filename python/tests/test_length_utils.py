from pixel_perfect_circles.circle import get_default_circle
from pixel_perfect_circles.length_utils import get_circle_by_lengths


def test_get_circle_by_lengths():
    assert get_circle_by_lengths(27, [4, 3, 1, 2]) == get_default_circle(27)


def test_get_circle_by_lengths_invalid():
    assert get_circle_by_lengths(27, [15]) == []
