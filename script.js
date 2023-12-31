document.addEventListener('DOMContentLoaded', function () {
  const statusElement = document.getElementById('status');
  const boardElement = document.getElementById('board');

  let board = Array(9).fill(null);
  let isXNext = true;

  // Function to calculate the winner
  const calculateWinner = (squares) => {
    const winningLines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (const line of winningLines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return null;
  };

  // Function to handle button click
  function handleButtonClick(index) {
    if (board[index] || calculateWinner(board)) {
      return;
    }

    if (isXNext) {
      board[index] = 'X';
    } else {
      board[index] = 'O';
    }

    isXNext = !isXNext;

    render();
  };

  // Function to render the game board
  const render = () => {
    // Clear the board
    boardElement.innerHTML = '';

    // Render each cell as a button
    board.forEach((value, index) => {
      const button = document.createElement('button');
      button.innerText = value;
      button.addEventListener('click', () => handleButtonClick(index));
      boardElement.appendChild(button);
    });

    // Display the status
    const winner = calculateWinner(board);
    if (winner) {
      const audio = new Audio('winner.wav');
      audio.addEventListener('canplaythrough', () => {
        audio.play();
      });

      statusElement.innerText = `Player ${winner} wins!`;
      statusElement.classList.add('div--status');
      boardElement.classList.add('div--status--winner');
    } else {
      const audio2 = new Audio('tap.wav');
      audio2.addEventListener('canplaythrough', () => {
        audio2.play();
      });

      if (isXNext) {
        statusElement.innerText = 'Next player: X';
      } else {
        statusElement.innerText = 'Next player: O';
      }

    }


  };

  // Initial render
  render();

  // Reset the game board
  const resetElement = document.getElementById('btn--reset');
  resetElement.addEventListener('click', () => {

      // Clear the board and reset game state
    board = Array(9).fill(null);
    isXNext = true;

    statusElement.innerHTML = '';
    statusElement.classList.remove('div--status');
    boardElement.classList.remove('div--status--winner');
    render();
  });

});
