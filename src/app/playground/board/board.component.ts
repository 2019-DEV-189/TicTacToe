import { Component, OnInit } from '@angular/core';
import { squareEnum } from '../square/squareEnum';
import { UtilService } from '../../util/utilService';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  providers:  [ UtilService ]
})
export class BoardComponent implements OnInit {

  public isGameOver: boolean;
  public gameResultMessage: string;
  public currentPlayer: squareEnum;
  public board: squareEnum[][];

  constructor(private utilService: UtilService) {
    this.utilService = utilService;
  }


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
    if (!this.isGameOver && this.board[rowIndex][colIndex] === squareEnum.EMPTY) {
      this.board[rowIndex][colIndex] = this.currentPlayer;
      if (this.isTriplet()) {
        this.isGameOver = true;
      }
      else {
        this.nextMove();
      }
    }
  }

  nextMove(): void {
    this.togglePlayer();
  }

  togglePlayer(): void {
    this.currentPlayer = this.currentPlayer === squareEnum.xPlayer ? squareEnum.oPlayer : squareEnum.xPlayer;
    this.gameResultMessage = `Player ${this.currentPlayer}'s turn`;
  }

  isTriplet(): boolean {
    return (this.isHorizontalTriplet() || this.isVerticalTriplet() || this.isDiagonalTriplet());
  }

  isHorizontalTriplet(): boolean {
    let horizontalTriplet = false;
    for (const colArray of this.board) {
      if (!horizontalTriplet) {
        horizontalTriplet = this.utilService.checkEquality(colArray[0], colArray[1], colArray[2]);
      }
    }
    return horizontalTriplet;
  }

  isVerticalTriplet(): boolean {
    let verticalTriplet = false;
    let rowIndex = 0;
    for (let colIndex = 0; colIndex < this.board[rowIndex].length; colIndex++) {
      if (!verticalTriplet) {
        verticalTriplet = this.utilService.checkEquality(this.board[0][colIndex], this.board[1][colIndex], this.board[2][colIndex]);
      }
    }
    return verticalTriplet;
  }

  isDiagonalTriplet(): boolean {
    return (this.isLeftDiagonalTriplet() || this.isRightDiagonalTriplet());
  }

  isLeftDiagonalTriplet(): boolean {
    return this.utilService.checkEquality(this.board[0][0], this.board[1][1], this.board[2][2]);
  }

  isRightDiagonalTriplet(): boolean {
    return this.utilService.checkEquality(this.board[0][2], this.board[1][1], this.board[2][0]);
  }
}
