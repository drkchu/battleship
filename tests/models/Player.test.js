import Ship from '../../src/models/Ship';
import Player from '../../src/models/Player';
import Gameboard from '../../src/models/Gameboard';


describe('Player', () => {
  test('should create a player with a gameboard', () => {
    const player = new Player();
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });

  test('real player can attack', () => {
    const player = new Player();
    const enemy = new Player();
    enemy.gameboard.placeShip(new Ship(3), {x: 0, y: 0}, 'horizontal');
    expect(enemy.gameboard.grid[0][0].ship.hits[0]).toBeFalsy();
    player.attack(enemy.gameboard, 0, 0);
    expect(enemy.gameboard.grid[0][0].ship.hits[0]).toBeTruthy();
  });

  test('computer player generates a valid move', () => {
    const computer = new Player(true);
    const move = computer.getComputerMove();
    expect(move).toHaveProperty('x');
    expect(move).toHaveProperty('y');
    expect(move.x).toBeGreaterThanOrEqual(0);
    expect(move.x).toBeLessThan(10);
    expect(move.y).toBeGreaterThanOrEqual(0);
    expect(move.y).toBeLessThan(10);
  });
});
