const grid = document.getElementById("sudoku-grid");

for (let row = 0; row < 9; row++) {
  const tr = document.createElement("tr");
  for (let col = 0; col < 9; col++) {
    const td = document.createElement("td");

    if (row % 3 === 0 && row !== 0) td.style.borderTop = "2px solid #000";
    if (col % 3 === 0 && col !== 0) td.style.borderLeft = "2px solid #000";

    const input = document.createElement("input");
    input.type = "number";
    input.min = "1";
    input.max = "9";
    td.appendChild(input);
    tr.appendChild(td);
  }
  grid.appendChild(tr);
}

function getBoard() {
  const board = [];
  for (let i = 0; i < 9; i++) {
    const row = [];
    for (let j = 0; j < 9; j++) {
      const val = grid.rows[i].cells[j].firstChild.value;
      row.push(val === "" ? 0 : parseInt(val));
    }
    board.push(row);
  }
  return board;
}

function setBoard(board) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      grid.rows[i].cells[j].firstChild.value =
        board[i][j] !== 0 ? board[i][j] : "";
    }
  }
}

function isValid(board, num, row, col) {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num || board[i][col] === num) return false;
  }
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
}

function solve(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, num, row, col)) {
            board[row][col] = num;
            if (solve(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function solveSudoku() {
  const board = getBoard();
  if (solve(board)) {
    setBoard(board);
    alert("Solved!");
  } else {
    alert("No solution found.");
  }
}
