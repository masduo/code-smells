export enum Symbol {
    empty = ' ',
    X = 'X',
    O = 'O',
}

type Coordinate = 0 | 1 | 2

interface Position {
    x: Coordinate ;
    y: Coordinate ;
}
interface Tile {
    position: Position;
    symbol: Symbol;
}

export class Game {
    private _lastSymbol: string = Symbol.empty;
    private _board: Board = new Board();

    public Play(symbol: Symbol, x: Coordinate, y: Coordinate) : void {
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
        else if (this._board.TileAt({ x, y }).symbol !== Symbol.empty) {
            throw new Error("Invalid position");
        }

        // update game state
        this._lastSymbol = symbol;
        this._board.AddTileAt(symbol, { x, y });
    }

    public Winner() : string {
        if (this._board.RowIsFilled(0) && this._board.SameSymbolInRow(0)) {
                return this._board.TileAt({ x: 0, y: 0 }).symbol
        }

        if (this._board.RowIsFilled(1) && this._board.SameSymbolInRow(1)) {
            return this._board.TileAt({ x: 1, y: 0 }).symbol
        }

        if (this._board.RowIsFilled(2) && this._board.SameSymbolInRow(2)) {
            return this._board.TileAt({ x: 2, y: 0 }).symbol
        }

        return Symbol.empty;
    }
}

class Board
{
    private _plays : Tile[] = [];

    constructor()
    {
        for (let i = 0; i < 3; i++)
        {
            for (let j = 0; j < 3; j++)
            {
                const tile : Tile = { position: { x: i as Coordinate, y: j as Coordinate }, symbol: Symbol.empty};
                this._plays.push(tile);
            }
        }
    }

    public TileAt({ x, y }: Position): Tile {
        return this._plays.find((t:Tile) => t.position.x === x && t.position.y === y)!
    }

    public AddTileAt(symbol: Symbol, position: Position) : void
    {
        this.TileAt(position).symbol = symbol;
    }

    public RowIsFilled(row: Coordinate): boolean {
        return this.TileAt({ x: row, y: 0 })!.symbol !== Symbol.empty &&
          this.TileAt({ x: row, y: 1 })!.symbol !== Symbol.empty &&
          this.TileAt({ x: row, y: 2 })!.symbol !== Symbol.empty
    }

    public SameSymbolInRow(row: Coordinate): boolean {
        return this.TileAt({ x: row, y: 0 })!.symbol === this.TileAt({ x: row, y: 1 })!.symbol &&
          this.TileAt({ x: row, y: 2 })!.symbol === this.TileAt({ x: row, y: 1 })!.symbol
    }
}