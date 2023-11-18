from typing import List

CELL_FULL = "██"
CELL_EMPTY = "░░"


def render_grid(grid: List[List[bool]]) -> str:
    lines_str = []
    for line in grid:
        line_str = ""
        for cell in line:
            line_str += CELL_FULL if cell else CELL_EMPTY

        lines_str.append(line_str)

    return "\n".join(lines_str)
