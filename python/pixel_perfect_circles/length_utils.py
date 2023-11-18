from typing import List, Tuple


def get_has_intersection_actual_size(arc_size: int, lengths: List[int]) -> Tuple[bool, int]:
    has_intersection = sum(lengths) == arc_size - len(lengths) + 1
    intersection_cells = 1 if has_intersection else 0
    actual_size = sum(lengths) + len(lengths) - intersection_cells
    return has_intersection, actual_size


def is_possible_lengths(arc_size: int, lengths: List[int]) -> int:
    _, actual_size = get_has_intersection_actual_size(arc_size, lengths)
    return actual_size == arc_size


def get_circle_by_lengths(size: int, lengths: List[int]) -> List[List[bool]]:
    arc_size = (size + 1) // 2
    has_intersection, actual_size = get_has_intersection_actual_size(arc_size, lengths)
    if actual_size != arc_size:
        print(f"Could not get grid by lengths, {actual_size} != {arc_size}")
        return []

    grid = []
    sum_length = -(size % 2)
    for length in lengths:
        sum_length += length * 2
        empty_length = (size - sum_length) // 2
        line = [False] * empty_length + [True] * sum_length + [False] * empty_length
        grid.append(line)

    for i, length in enumerate(reversed(lengths)):
        if has_intersection and i == 0:
            length -= 1
            if length == 0:
                continue
        else:
            sum_length += 2

        empty_length = (size - sum_length) // 2
        line = [False] * empty_length + [True] * sum_length + [False] * empty_length
        grid.extend([line] * length)

    for i in range(size // 2 - 1, -1, -1):
        grid.append(grid[i])

    return grid


def is_monotonous_lengths(lengths: List[int]) -> bool:
    prev_length = lengths[0]
    for length in lengths:
        if length > prev_length:
            return False

        prev_length = length

    return True


def filter_monotonous_lengths(options: List[List[int]]) -> List[List[int]]:
    return list(filter(is_monotonous_lengths, options))


def get_lengths_options(arc_length: int) -> List[List[int]]:
    options = _get_lengths_options(arc_length)
    return [
        option for option in options
        if is_possible_lengths(arc_length, option)
    ]


def _get_lengths_options(remaining_length: int) -> List[List[int]]:
    if remaining_length <= 0:
        return [[]]

    if remaining_length == 1:
        return [[1]]

    result = []
    for length in range(1, remaining_length):
        result.extend([
            [length] + lengths
            for lengths in _get_lengths_options(remaining_length - length - 1)
        ])

    result.append([remaining_length])
    return result
