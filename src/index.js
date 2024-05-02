// Importing styles
import "./styles/styles.css";

// Importing models
import Player from "./models/Player";
import Ship from "./models/Ship";

function setupBoard(gameboard, elementId, isHuman) {
    const boardElement = document.getElementById(elementId);
    boardElement.innerHTML = ''; // Clear previous setup if any
    for (let y = 0; y < gameboard.grid.length; y++) {
        for (let x = 0; x < gameboard.grid.length; x++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.x = x;
            cell.dataset.y = y;

            // Adding event listeners only to the computer's board
            if (!isHuman) {
                cell.addEventListener('click', () => {
                    // Check if all ships are placed
                    if (remainingShips.length > 0) {
                        alert("Please finish placing all your ships first.");
                        return;
                    }

                    // Player makes a move
                    if (currentPlayer === humanPlayer && !gameOver) {
                        playerTurn(x, y);
                    }
                });
            }
            boardElement.appendChild(cell);
        }
    }
}

function updateUI() {
  updateBoardUI(humanPlayer.gameboard, "playerBoard", true);
  updateBoardUI(computerPlayer.gameboard, "computerBoard", false);
}

function updateBoardUI(gameboard, elementId, isHuman) {
  const boardElement = document.getElementById(elementId);
  for (let y = 0; y < gameboard.grid.length; y++) {
    for (let x = 0; x < gameboard.grid.length; x++) {
      const cellElement = boardElement.children[y * gameboard.grid.length + x];
      const cell = gameboard.grid[y][x];
      cellElement.className = "cell";

      if (cell && cell.ship) {
        if (cell.ship.isSunk()) {
          cellElement.classList.add("sunk");
        } else if (cell.ship.hits[cell.index]) {
          cellElement.classList.add("hit");
        } else if (isHuman) {
          // Only show ships on the human board
          cellElement.classList.add("ship");
        }
      } else if (gameboard.missedAttacks.find((m) => m.x === x && m.y === y)) {
        cellElement.classList.add("miss");
      }
    }
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === humanPlayer ? computerPlayer : humanPlayer;
}

function playerTurn(x, y) {
  if (currentPlayer === humanPlayer) {
    humanPlayer.attack(computerPlayer.gameboard, x, y);
    updateUI();
    if (computerPlayer.gameboard.allShipsSunk()) {
      alert("Player wins!");
      gameOver = true;
      return;
    }
    switchPlayer();
    setTimeout(computerTurn, 500);
  }
}

function computerTurn() {
  if (gameOver) return; // Prevent computer's turn if the game is over

  const { x, y } = computerPlayer.getComputerMove();
  computerPlayer.attack(humanPlayer.gameboard, x, y);
  updateUI();
  if (humanPlayer.gameboard.allShipsSunk()) {
    alert("Computer wins!");
    gameOver = true;
    return;
  }
  switchPlayer();
}

function placeShipsRandomly(player, shipSizes) {
  shipSizes.forEach((size) => {
    let placed = false;
    while (!placed) {
      const x = Math.floor(Math.random() * player.gameboard.grid.length);
      const y = Math.floor(Math.random() * player.gameboard.grid.length);
      const orientation = Math.random() > 0.5 ? "horizontal" : "vertical";
      try {
        player.gameboard.placeShip(new Ship(size), { x, y }, orientation);
        placed = true;
      } catch (error) {
        // Just gotta keep trying
      }
    }
  });
}

let remainingShips = [5, 4, 3, 3, 2]; // Sizes of ships remaining to be placed

function setupManualPlacement() {
    const sizeSelector = document.getElementById('shipSize');
    const orientationSelector = document.getElementById('orientation');
    const infoText = document.getElementById('instructions');

    function updateShipSizes() {
        sizeSelector.innerHTML = '';
        remainingShips.forEach(size => {
            const option = document.createElement('option');
            option.value = size;
            option.textContent = `Ship size: ${size}`;
            sizeSelector.appendChild(option);
        });
    }

    updateShipSizes();  // Initial setup of ship sizes

    document.getElementById('playerBoard').addEventListener('click', function(event) {
        const cell = event.target;
        if (!cell.classList.contains('cell')) return; // Ensure clicks are on cells only

        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        const size = parseInt(sizeSelector.value);
        const orientation = orientationSelector.value;

        try {
            humanPlayer.gameboard.placeShip(new Ship(size), { x, y }, orientation);
            updateUI();
            // Remove the placed ship size from the remainingShips
            const index = remainingShips.indexOf(size);
            if (index > -1) {
                remainingShips.splice(index, 1);
                updateShipSizes();  // Update the dropdown menu
            }
            // Update instructions
            if (remainingShips.length > 0) {
                infoText.textContent = "Place your next ship: " + remainingShips.join(", ");
            } else {
                infoText.textContent = "All ships placed. Start the game!";
            }
        } catch (error) {
            alert(error.message); // Show error if ship placement fails
        }
    });
}


const humanPlayer = new Player(false, 10);
const computerPlayer = new Player(true, 10);

document.addEventListener("DOMContentLoaded", () => {
    setupBoard(humanPlayer.gameboard, 'playerBoard', true);
    setupBoard(computerPlayer.gameboard, 'computerBoard', false);
    placeShipsRandomly(computerPlayer, [5, 4, 3, 3, 2]);
    setupManualPlacement();
    updateUI();
});

let currentPlayer = humanPlayer; // global variables that'll change over time
let gameOver = false;
