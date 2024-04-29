
import Ship from '../src/Ship';

describe('Ship', () => {
  test('should be hit when hit function is called', () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  test('should be hit when hit function is called multiple times', () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.hits).toBe(1);
    shit.hit();
    expect(ship.hits).toBe(2);
  });

  test('should be sunk if number of hits is equal to length', () => {
    const ship = new Ship(1);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  test('should be sunk if number of hits is equal to length longer', () => {
    const ship = new Ship(3);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  // ... other test cases
});