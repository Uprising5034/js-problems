const STATE = {};

const BOARD = document.querySelector("#sudoku-board");

function initState(puzzle) {
  const coords = {
    columns: [],
    rows: [],
  };

  let charCode = 97;
  for (let i = 1; i <= 9; i++) {
    coords.columns.push(i);

    coords.rows.push(String.fromCharCode(charCode++));
  }

  const puzzleItr = Array.from(puzzle).entries();
  coords.rows.forEach((row, idxRow) => {
    coords.columns.forEach((column) => {
      const nextValue = parseInt(puzzleItr.next().value[1]);
      STATE[row + column] = {
        start: nextValue ? nextValue : null,
        solve: null,
        user: null,
        possible: null,
        userPossible: null,
      };
    });
  });
}

function renderCells() {
  Object.keys(STATE).forEach((key) => {
    renderCell(key);
  });
}

function renderCell(coord) {
  const cell = document.createElement("div");
  cell.id = coord;
  cell.classList.add("cell");
  cell.innerText = STATE[coord].start;

  const column = parseInt(coord[1])
  const row = coord.charCodeAt(0)

  console.log('row :>> ', row % 3);

  if (!(column % 3)) {
    cell.classList.add("cell-right")
  }
  if (!((column + -1) % 3)) {
    cell.classList.add("cell-left")
  }

  if (!(row % 3)) {
    cell.classList.add("cell-bottom")
  }
  if (!((row + -1) % 3)) {
    cell.classList.add("cell-top")
  }

  BOARD.append(cell);
}

initState(puzzles[0]);

renderCells();
