import { Symbol } from "./models/Symbol";
import { Coordinate } from "./models/Coordinate";
import { Position } from "./models/Position";
import { Tile } from "./models/Tile";

export class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile: Tile = {
          position: new Position(i as Coordinate, j as Coordinate),
          symbol: Symbol.empty,
        };
        this._plays.push(tile);
      }
    }
  }

  public tileAt(position: Position): Tile {
    return this._plays.find((t: Tile) => t.position.equals(position))!;
  }

  public addTileAt(symbol: Symbol, position: Position): void {
    this.tileAt(position).symbol = symbol;
  }

  public sameSymbolInRow(row: Coordinate): Symbol {
    const symbol = this.tileAt(new Position(row, 0)).symbol;

    const sameSymbolInRow =
      symbol === this.tileAt(new Position(row, 1)).symbol &&
      symbol === this.tileAt(new Position(row, 2)).symbol;

    return sameSymbolInRow ? symbol : Symbol.empty;
  }
}
