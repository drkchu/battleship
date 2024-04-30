import Gameboard from '../../src/models/Gameboard';

class Player {
    constructor(isComputer = false, boardSize = 10) {
        this.isComputer = isComputer;
        this.boardSize = boardSize;
        this.gameboard = new Gameboard(boardSize);
        this.movesSoFar = [];
    }
  
    attack(enemyBoard, x, y) {
        enemyBoard.receiveAttack({ x, y });
        this.movesSoFar.push({x, y});
    }
  
    getComputerMove() {
        let x, y;
        do {
            x = Math.floor(Math.random() * this.boardSize);
            y = Math.floor(Math.random() * this.boardSize);
        } while (this.movesSoFar.some(move => move.x === x && move.y === y));

        return { x, y };
    }
}
export default Player;