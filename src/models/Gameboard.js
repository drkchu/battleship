// Gameboard for my battleship game

class Gameboard {
    constructor(size = 10) {
        this.grid = this.createGrid(size);
        this.ships = []; // Stores a list of ships along with the coordinates the ship occupies
        this.missedAttacks = [];
      }

      // Initialize a n x n grid, defaults to 10 x 10
    createGrid(size = 10) {
        return Array.from({ length: size }, () => Array(size).fill(null));
    }
      
      // Places a ship with the head at the coordinate, oriented either vertically or horizontally
    placeShip(ship, coordinates, orientation) {
        const occupiedCoordinates = [];
        for (let i = 0; i < ship.length; i++) {
            occupiedCoordinates.push({
                x: coordinates.x + (orientation === 'horizontal' ? i : 0),
                y: coordinates.y + (orientation === 'vertical' ? i : 0),
            });
        }

        const outOfBounds = occupiedCoordinates.some(coord => 
            coord.x >= this.grid.length || coord.y >= this.grid.length || 
            coord.x < 0 || coord.y < 0
        );

        if (outOfBounds)
            throw new Error('Ship placement is out of bounds.');

        const overlap = occupiedCoordinates.some(coord => 
            this.grid[coord.y][coord.x] !== null
        );

        if (overlap)
            throw new Error('Ship placement overlaps with another ship.');

        occupiedCoordinates.forEach((coord, index) => {
            this.grid[coord.y][coord.x] = {ship, index}; // Storing the reference
        });

        this.ships.push({
            ship,
            coordinates: occupiedCoordinates,
        });
    }
      
      // Determined whether or not an attack hits a ship, sends the hit function to the corresponding ship
      // If missed, records the coordinates of the missed shot
    receiveAttack(coordinates) {
        const target = this.grid[coordinates.y][coordinates.x];
        if (target)
            target.ship.hit(target.index);
        else
            this.missedAttacks.push({ x: coordinates.x, y: coordinates.y });
    }
    
    allShipsSunk() {
        return this.ships.every(shipObject => shipObject.ship.isSunk());
    }
}

export default Gameboard;