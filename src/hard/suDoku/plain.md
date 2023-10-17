# Plain English Solution

Various ideas ~~stolen~~ borrowed from [Cracking The Cryptic](https://app.crackingthecryptic.com/) && [Sudoku Wiki](https://www.sudokuwiki.org)

## Making Visuals

1. We need a 9x9 grid! (Duh!)
2. Each of the cells in the grid will take input from 1-9
    1. Number states and positions to be determined by `state`
    2. Each cell with have it's own `#id` corresponding with their coordinate eg. `#C3`
3. Initial numbers should be font colour `black`, with background greyed out to indicate it is immutable
4. User inputs should be `blue`
5. Calculated inputs should be `red`

## Data Stuff

1. Monitor numbers using `state`

2. Coordinate system `A-J` `1-9`, simplified 3x3 grid below (`I` is conventionally skipped as it can be mistaken for `1`):

    |   | 1 | 2 | 3 |
    | - | - | - | - |
    | A |   |   |   |
    | B |   |   |   |
    | C |   |   |   |

3. Each coordinate should keep track of the following:
    - Starting number, single character `Number` (1-9)
    - Solved input, single character `Number` (1-9)
    - User input, single character `Number` (1-9)
    - Possible inputs, `Array` of possible single character `Number` [(1-9), (1-9), ... ]
        - This should be calculated only based on starting number and solved inputs
    - User possible inputs. Similar to possible inputs, only with the intention to show users their possible inputs  and therefore will take into account user input

4. Possible `state` draft as follows:

    ```js
    const state = {
        A1: {
            start: 2,
            solve: null,
            user: null,
            possible: null,
            userPossible: null,
        },
        A2: {
            start: null,
            solve: null,
            user: 5,
            possible: [1, 3, 4, 5, 6, 7, 8, 9],
            userPossible: [5]
        },
        ...
    }
    ```

5. When importing from `data/sudoku.txt`, each coordinate in `state` starts off as `null` aside from `possible` which starts out with a full `Array` of possible `Numbers`

6. Any non `0` values get populated in their respective `start` property of each coordinate. Each `possible` gets set to `null`

## Solving algorithms

Each cell is directly affected by 3 group of cells (`Groups`):

1. It's box
2. It's row
3. It's column

On each solve iteration, it is important to check from simple to complicated, rough hierarchy should be as follows:

1. Checking for `Naked Singles`:
    - Cases where only one `Number` is left in the `possibleArray`
        1. If any cell has only one `Number` in their `possibleArray`, update the cell's `solve` to said `Number`
2. Check for `Hidden Singles`:
    - For each Group:
        1. Tally each `Number` contained within each `possibleArray`
        2. For each `count(Number) === 1`:
            - locate cell which contains the single `Number`
            - update the cell's `solve` to said `Number`
3. Checking for `Naked Pairs`:
    - Cases where two cells in the same `Group` are left with the same pair of `Numbers` in their `possibleArray` eg. `[6, 7]`
    - This case happening means that any other instances of these `Numbers` in the `Group` can not be one of the two `Numbers` in the pair, therefore we can remove these `Numbers` from their `possibleArray`
        - For each Group:
            1. Check for any cells which have `possible.length === 2`
            2. For each pair of cell check `cell1[0] === cell2[0] && cell1[1] === cell2[1]`
            3. If any matching pair found, remove the pair of `Numbers` from the other `possibleArrays` in the `Group`
4. Checking for `Naked Triples`
    - To consider adding if the above checks don't solve the exercise 😊
5. Checking for `Hidden Pairs`
    - To consider adding if the above checks don't solve the exercise 😊
6. Checking for `Hidden Triples`
    - To consider adding if the above checks don't solve the exercise 😊

After any numbers are inserted in `solve`, the `possibleArray` should be updated to remove any no longer valid `Numbers`.

After any numbers are removed from any `possibleArray`, the process should reset back to the beginning.
