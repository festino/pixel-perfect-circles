from pixel_perfect_circles.common import render_grid, CELL_FULL, CELL_EMPTY


def test_render_grid():
    assert render_grid([[False]]) == CELL_EMPTY
    assert render_grid([[True]]) == CELL_FULL
    assert render_grid([
        [True, True, True],
        [False, True, False],
        [True, False, False]
    ]) == (CELL_FULL + CELL_FULL + CELL_FULL + "\n"
           + CELL_EMPTY + CELL_FULL + CELL_EMPTY + "\n"
           + CELL_FULL + CELL_EMPTY + CELL_EMPTY)
