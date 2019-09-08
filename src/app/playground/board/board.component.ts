import { Component, OnInit } from '@angular/core';
import { squareEnum } from '../square/squareEnum';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  public isGameOver: boolean;
  public gameResultMessage: string;
  public currentPlayer: squareEnum;
  public board: squareEnum[][];

  constructor() { }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.board = [];
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      this.board[rowIndex] = [];
      for (let colIndex = 0; colIndex < 3; colIndex++) {
        this.board[rowIndex][colIndex] = squareEnum.EMPTY;
      }
    }
    this.currentPlayer = squareEnum.xPlayer;
    this.isGameOver = false;
    this.gameResultMessage = `Player ${this.currentPlayer}'s turn`;
  }

  updateBoard(rowIndex: number, colIndex: number): void {
    this.board[rowIndex][colIndex] = this.currentPlayer;
  }
}
