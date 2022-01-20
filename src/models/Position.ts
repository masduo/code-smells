import { Coordinate } from "./Coordinate";

export class Position {
  public x: Coordinate;
  public y: Coordinate;

  public constructor(x: Coordinate, y: Coordinate) {
    this.x = x;
    this.y = y;
  }

  public equals(position: Position): boolean {
    return this.x === position.x && this.y === position.y;
  }
}
