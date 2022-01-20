import { Game, Symbol } from "./Game";

describe('TicTacToe game', () => {
    let game : Game;

    beforeEach(() => {
        game = new Game();
    });

    it('should not allow player O to play first', () => {
        expect(() => game.Play(Symbol.O, 0, 0)).toThrow();
    });

    it('should not allow player x to play twice in a row', () =>{
        game.Play(Symbol.X, 0, 0);
        expect(() => game.Play(Symbol.X, 1, 0)).toThrow();
    });
    
    it('should not allow a player to play in last played position', () => {
        game.Play(Symbol.X, 0, 0);
        expect(() => game.Play(Symbol.O, 0, 0)).toThrow();
    });
    
    it('should not allow a player to play in any played position', () => {
        game.Play(Symbol.X, 0, 0);
        game.Play(Symbol.O, 1, 0);
        expect(() => game.Play(Symbol.X, 0, 0)).toThrow();
    });
    
    it('should declare player X as winner if it plays three in top row', () =>{
        game.Play(Symbol.X, 0, 0);
        game.Play(Symbol.O, 1, 0);
        game.Play(Symbol.X, 0, 1);
        game.Play(Symbol.O, 1, 1);
        game.Play(Symbol.X, 0, 2);
        
        const winner = game.Winner();
        
        expect(winner).toBe("X");
    });
    
    it('should declare player O as winner if it plays three in top row', () => {
        game.Play(Symbol.X, 1, 0);
        game.Play(Symbol.O, 0, 0);
        game.Play(Symbol.X, 1, 1);
        game.Play(Symbol.O, 0, 1);
        game.Play(Symbol.X, 2, 2);
        game.Play(Symbol.O, 0, 2);
        
        const winner = game.Winner();
        
        expect(winner).toBe("O");
    });
    
    it('should declare player X as winner if it plays three in middle row', () => {
        game.Play(Symbol.X, 1, 0);
        game.Play(Symbol.O, 0, 0);
        game.Play(Symbol.X, 1, 1);
        game.Play(Symbol.O, 0, 1);
        game.Play(Symbol.X, 1, 2);
       
        const winner = game.Winner();
        
        expect(winner).toBe("X");
    });
    
    it('should declare player O as winner if it plays three in middle row', () => {
        game.Play(Symbol.X, 0, 0);
        game.Play(Symbol.O, 1, 0);
        game.Play(Symbol.X, 2, 1);
        game.Play(Symbol.O, 1, 1);
        game.Play(Symbol.X, 2, 2);
        game.Play(Symbol.O, 1, 2);
        
        const winner = game.Winner();
        
        expect(winner).toBe("O");
    });
    
    it('should declare player X as winner if it plays three in bottom row', () => {
        game.Play(Symbol.X, 2, 0);
        game.Play(Symbol.O, 0, 0);
        game.Play(Symbol.X, 2, 1);
        game.Play(Symbol.O, 0, 1);
        game.Play(Symbol.X, 2, 2);
        
        const winner = game.Winner();
        
        expect(winner).toBe("X");
    });
    
    it('should declare player O as winner if it plays three in bottom row', () => {
        game.Play(Symbol.X, 0, 0);
        game.Play(Symbol.O, 2, 0);
        game.Play(Symbol.X, 1, 1);
        game.Play(Symbol.O, 2, 1);
        game.Play(Symbol.X, 0, 1);
        game.Play(Symbol.O, 2, 2);
        
        const winner = game.Winner();
        
        expect(winner).toBe("O");
    });
});
