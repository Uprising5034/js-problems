const STATE = {
  puzzleNo: 0,
  board: {},
};

const BOARD = document.querySelector("#sudoku-board");
const PUZZLE_SELECT = document.querySelector("#puzzle-selection");
const PUZZLE_ID = PUZZLE_SELECT.querySelector("#puzzle-id");

function initState(puzzleNo) {
  const puzzle = PUZZLES[puzzleNo];
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
  coords.rows.forEach((row) => {
    coords.columns.forEach((column) => {
      const nextValue = parseInt(puzzleItr.next().value[1]);
      STATE.board[row + column] = {
        start: nextValue ? nextValue : null,
        solve: null,
        user: null,
        possible: null,
        userPossible: null,
      };
    });
  });

  renderBoard();
  renderPuzzleNo();
}

function renderBoard() {
  clearElement(BOARD);

  Object.keys(STATE.board).forEach((key) => {
    renderCell(key);
  });
}

function renderCell(coord) {
  const cell = document.createElement("div");
  cell.id = coord;
  cell.classList.add("cell");
  cell.innerText = STATE.board[coord].start;

  const column = parseInt(coord[1]);
  const row = coord.charCodeAt(0);

  if (!(column % 3)) {
    cell.classList.add("cell-right");
  }
  if (!((column + -1) % 3)) {
    cell.classList.add("cell-left");
  }

  if (!(row % 3)) {
    cell.classList.add("cell-bottom");
  }
  if (!((row + -1) % 3)) {
    cell.classList.add("cell-top");
  }

  BOARD.append(cell);
}

function clearElement(element) {
  while (element.lastChild) {
    element.lastChild.remove();
  }
}

function puzzleSelect() {
  const buttons = PUZZLE_SELECT.querySelectorAll("button");

  buttons.forEach((button, idx) => {
    button.addEventListener("click", (e) => {
      changePuzzle(STATE.puzzleNo + (idx ? +1 : -1));
    });
  });

  const input = PUZZLE_SELECT.querySelector("input");
  input.setAttribute("min", 0 + 1);
  input.setAttribute("max", PUZZLES.length + 1);

  input.addEventListener("input", () => changePuzzle(input.value - 1));
}

function renderPuzzleNo() {
  PUZZLE_ID.children[0].value = STATE.puzzleNo + 1;
  PUZZLE_ID.children[1].innerText = `/ ${PUZZLES.length}`;
}

function changePuzzle(puzzleNo) {
  if (
    (STATE.puzzleNo > puzzleNo && puzzleNo > -1) ||
    (STATE.puzzleNo < puzzleNo && puzzleNo < PUZZLES.length)
  ) {
    STATE.puzzleNo = puzzleNo;
    initState(puzzleNo);
  }
}

initState(0);

puzzleSelect();
