import { Board } from "./Board";
import { Coordinate } from "./models/Coordinate";
import { Position } from "./models/Position";
import { Symbol } from "./models/Symbol";

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
    else if (this._lastSymbol === symbol) {
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
