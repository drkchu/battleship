import Gameboard from '../../src/models/Gameboard';
import Ship from '../../src/models/Ship';

describe('Gameboard', () => {
    let gameboard;

    beforeEach(() => {
      gameboard = new Gameboard(); // Gameboard is a 10 x 10 board
    });
    
    describe('Placing ships', () => {
        test('places a ship at the specific coordinate horizontally', () => {
            const ship = new Ship(3);
            const startPosition = { x: 0, y: 0 };
            gameboard.placeShip(ship, startPosition, 'horizontal');
            expect(gameboard.grid[0][0]).toBe(ship);
            expect(gameboard.grid[0][1]).toBe(ship);
            expect(gameboard.grid[0][2]).toBe(ship);
            expect(gameboard.grid[0][3]).toBe(null);
          });

          test('places a ship at specified coordinates vertically', () => {
            const ship = new Ship(4);
            const startPosition = { x: 2, y: 5 };
            gameboard.placeShip(ship, startPosition, 'vertical');
    
            expect(gameboard.grid[5][2]).toBe(ship);
            expect(gameboard.grid[6][2]).toBe(ship);
            expect(gameboard.grid[7][2]).toBe(ship);
            expect(gameboard.grid[8][2]).toBe(ship);
          });

          test('throws an error if ship placement is out of bounds', () => {
            const ship = new Ship(3);
            const startPosition = { x: 8, y: 0 };
            
            // Throws an error since the board is has valid x in [0, 9] but ship occupies x = 8, 9, and 10.
            expect(() => gameboard.placeShip(ship, startPosition, 'horizontal')).toThrow('Ship placement is out of bounds.');
          });

          test('throws an error if ship placement overlaps another ship', () => {
            const ship1 = new Ship(3);
            const ship2 = new Ship(3);
            gameboard.placeShip(ship1, { x: 0, y: 0 }, 'horizontal');
            
            // Expect an error when trying to place another ship on top of the first one
            expect(() => gameboard.placeShip(ship2, { x: 0, y: 0 }, 'horizontal')).toThrow('Ship placement overlaps with another ship.');
          });

          test('throws an error if ship placement partially overlaps another ship', () => {
            const ship1 = new Ship(3);
            const ship2 = new Ship(3);
            gameboard.placeShip(ship1, { x: 0, y: 1 }, 'horizontal');
            
            expect(() => gameboard.placeShip(ship2, { x: 1, y: 0 }, 'vertical')).toThrow('Ship placement overlaps with another ship.');
          });
    });
  
    test('should record an attack at a specific coordinate', () => {
      gameboard.receiveAttack({ x: 0, y: 0 });
      // todo
    });
  
    test('should keep track of missed attacks', () => {
      gameboard.receiveAttack({ x: 9, y: 9 });
      expect(gameboard.missedAttacks).toContainEqual({ x: 9, y: 9 });
    });
  
    test('should report whether all ships have been sunk', () => {
      // todo
    });
  });