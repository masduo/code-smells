export enum Symbol {
  empty = " ",
  X = "X",
  O = "O",
}

type Coordinate = 0 | 1 | 2;

class Position {
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

interface Tile {
  position: Position;
  symbol: Symbol;
}

export class Game {
  private _lastSymbol: string = Symbol.empty;
  private _board: Board = new Board();

  public play(symbol: Symbol, x: Coordinate, y: Coordinate): void {
    //if first move
    if (this._lastSymbol === Symbol.empty) {
      //if player is X
      if (symbol === Symbol.O) {
        throw new Error("Invalid first player");
      }
    }
    //if not first move but player repeated
    else if (symbol === this._lastSymbol) {
      throw new Error("Invalid next player");
    }
    //if not first move but play on an already played tile
    else if (this._board.tileAt(new Position(x, y)).symbol !== Symbol.empty) {
      throw new Error("Invalid position");
    }

    // update game state
    this._lastSymbol = symbol;
    this._board.addTileAt(symbol, new Position(x, y));
  }

  public winner(): string {
    for (let c = 0; c < 3; c++) {
      const symbol = this._board.sameSymbolInRow(c as Coordinate);
      if (symbol != Symbol.empty) {
        return symbol;
      }
    }

    return Symbol.empty;
  }
}

class Board {
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
