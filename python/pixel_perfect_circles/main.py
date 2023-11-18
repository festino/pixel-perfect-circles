from pixel_perfect_circles.circle import get_default_circle, get_circle_min_area_deviation
from pixel_perfect_circles.common import render_grid
from pixel_perfect_circles.length_utils import get_circle_by_lengths

if __name__ == '__main__':
    print(render_grid(get_default_circle(27)))
    print()
    print(render_grid(get_circle_by_lengths(27, [4, 3, 1, 2])))
    # print(render_grid(get_circle_by_lengths(27, [14])))
    # print(render_grid(get_circle_by_lengths(27, [6, 1, 1, 1, 1])))
    print()
    print(render_grid(get_circle_min_area_deviation(27, True)))
    print(render_grid(get_circle_min_area_deviation(50, True)))
