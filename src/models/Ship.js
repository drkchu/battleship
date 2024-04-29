// Ships have are constructed with a given length, and keep track of the number of hits they've received

class Ship {
    constructor(length) {
      this.length = length;
      this.hits = Array(length).fill(false); // Hits is an array indicating a ships position
    }
  
    hit(position) {
      if(position >= 0 && position < this.length) {
        this.hits[position] = true;
      }
    }
  
    isSunk() {
      return this.hits.every(hit => hit);
    }
  }
  
  export default Ship;