
import Ship from '../../src/models/Ship';

describe('Ship', () => {
  test('should be hit when hit function is called', () => {
    const ship = new Ship(3);
    ship.hit(0);
    const shipHits = ship.hits.filter((isHit) => isHit).length;
    expect(shipHits).toBe(1);
  });

  test('should be hit when hit function is called multiple times', () => {
    const ship = new Ship(3);
    let shipHits = ship.hits.filter((isHit) => isHit).length;
    expect(shipHits).toBe(0);
    ship.hit(0);
    shipHits = ship.hits.filter((isHit) => isHit).length;
    expect(shipHits).toBe(1);
    ship.hit(1);
    shipHits = ship.hits.filter((isHit) => isHit).length
    expect(shipHits).toBe(2);
  });

  test('hit in the same spot', () => {
    const ship = new Ship(3);
    let shipHits = ship.hits.filter((isHit) => isHit).length;
    expect(shipHits).toBe(0);
    ship.hit(0);
    shipHits = ship.hits.filter((isHit) => isHit).length;
    expect(shipHits).toBe(1);
    ship.hit(0);
    shipHits = ship.hits.filter((isHit) => isHit).length
    expect(shipHits).toBe(1);
  });

  test('should be sunk if number of hits is equal to length', () => {
    const ship = new Ship(1);
    ship.hit(0);
    expect(ship.isSunk()).toBe(true);
  });

  test('should be sunk if number of hits is equal to length longer', () => {
    const ship = new Ship(3);
    ship.hit(0);
    expect(ship.isSunk()).toBe(false);
    ship.hit(1);
    expect(ship.isSunk()).toBe(false);
    ship.hit(2);
    expect(ship.isSunk()).toBe(true);
  });

  test('trying to sink a ship but not hitting the right positions', () => {
    const ship = new Ship(3);
    let shipHits = ship.hits.filter((isHit) => isHit).length;

    ship.hit(0);
    shipHits = ship.hits.filter((isHit) => isHit).length;
    expect(shipHits).toBe(1);
    expect(ship.isSunk()).toBe(false);

    ship.hit(1);
    shipHits = ship.hits.filter((isHit) => isHit).length;
    expect(shipHits).toBe(2);
    expect(ship.isSunk()).toBe(false);

    ship.hit(3);
    shipHits = ship.hits.filter((isHit) => isHit).length;
    expect(shipHits).toBe(2);
    expect(ship.isSunk()).toBe(false);
  });
});