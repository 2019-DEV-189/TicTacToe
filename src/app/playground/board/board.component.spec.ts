import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardComponent } from './board.component';
import { squareEnum } from '../square/squareEnum';
import { SquareComponent } from '../square/square.component';
import { By } from '@angular/platform-browser';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let gameStatusElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardComponent,
                      SquareComponent
                    ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    gameStatusElement = fixture.debugElement.nativeElement.querySelector('#status');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('X always goes first', function() {
    let rowIndex: number;
    let colIndex: number;

    beforeEach (function() {
      ({ rowIndex, colIndex } = firstRuleSetup(fixture, rowIndex, colIndex, component));
    });

    it('should have X player as a current player when a new game begins', function() {
      component.newGame();
      expect(component.currentPlayer).toEqual(squareEnum.xPlayer);
      expect(component.currentPlayer).not.toEqual(squareEnum.oPlayer);
      fixture.detectChanges();
      expect(gameStatusElement.textContent).toContain('Player X\'s turn');
    });

    it('should be X that goes in first', function() {
      expect(component.board[rowIndex][colIndex]).toEqual(squareEnum.xPlayer);
      expect(component.board[rowIndex][colIndex]).not.toEqual(squareEnum.oPlayer);
    });
  });

  describe('Players cannot play on a played position', function() {
    let rowIndex: number;
    let colIndex: number;
    let board: squareEnum[][];

    beforeEach (function() {
      ({ rowIndex, colIndex, board } = secondRuleSetup(fixture, rowIndex, colIndex, board, component));
    });

    it('should not let player to update the board on a played position', function() {
      expect(component.board[rowIndex][colIndex]).toEqual(board[rowIndex][colIndex]);
    });
  });

  describe('Players alternate placing X’s and O’s on the board until a game is over(win or draw)', function(){

    let rowIndex: number;
    let colIndex: number;
    let currentPlayer: squareEnum;
    let board: squareEnum[][];

    beforeEach (function(){
      let square = fixture.debugElement.query(By.css('app-square'));
      square.triggerEventHandler('click', null);
    });

    it('should toggle Players on every next move', function() {
      spyOn(component, 'togglePlayer');
      component.nextMove();
      expect(component.togglePlayer).toHaveBeenCalled();
    });

    it('should allow Player `X` to play next if Player `O` played last', function() {
      rowIndex = 0;
      colIndex = 2;
      currentPlayer = squareEnum.oPlayer;

      board =  [
        [squareEnum.xPlayer, squareEnum.EMPTY, squareEnum.EMPTY],
        [squareEnum.EMPTY, currentPlayer, squareEnum.EMPTY],
        [squareEnum.EMPTY, squareEnum.EMPTY, squareEnum.EMPTY]
      ];

      component.board = board;
      component.currentPlayer = currentPlayer;
      component.updateBoard(rowIndex, colIndex);
      fixture.detectChanges();
      expect(component.currentPlayer).toBe(squareEnum.xPlayer);
      expect(component.gameResultMessage).toBe(`Player X\'s turn`);
      expect(component.isGameOver).toBeFalsy();
    });

    it('should allow Player `O` to play next if Player `X` played last', function() {
      rowIndex = 1;
      colIndex = 0;

      currentPlayer = squareEnum.xPlayer;
      
      board =  [
        [squareEnum.xPlayer, squareEnum.EMPTY, squareEnum.xPlayer],
        [squareEnum.EMPTY, squareEnum.oPlayer, squareEnum.EMPTY],
        [squareEnum.EMPTY, squareEnum.EMPTY, squareEnum.EMPTY]
      ];

      component.board = board;
      component.currentPlayer = currentPlayer;
      component.updateBoard(rowIndex, colIndex);
      fixture.detectChanges();
      expect(component.currentPlayer).toBe(squareEnum.oPlayer);
      expect(component.gameResultMessage).toBe(`Player O\'s turn`);
      expect(component.isGameOver).toBeFalsy();
    });
  });
});

function firstRuleSetup(fixture: ComponentFixture<BoardComponent>, rowIndex: number, colIndex: number, component: BoardComponent) {
  let squareElement = fixture.debugElement.query(By.css('app-square'));
  rowIndex = 0;
  colIndex = 0;
  component.board = [
    [squareEnum.EMPTY, squareEnum.EMPTY, squareEnum.EMPTY],
    [squareEnum.EMPTY, squareEnum.EMPTY, squareEnum.EMPTY],
    [squareEnum.EMPTY, squareEnum.EMPTY, squareEnum.EMPTY]
  ];
  squareElement.triggerEventHandler('click', null);
  component.updateBoard(rowIndex, colIndex);
  fixture.detectChanges();
  return { rowIndex, colIndex };
}

function secondRuleSetup(fixture: ComponentFixture<BoardComponent>, rowIndex: number, colIndex: number, board: squareEnum[][], component: BoardComponent) {
  let square = fixture.debugElement.query(By.css('app-square'));
  rowIndex = 0;
  colIndex = 0;
  board = [
    [squareEnum.xPlayer, squareEnum.xPlayer, squareEnum.EMPTY],
    [squareEnum.EMPTY, squareEnum.oPlayer, squareEnum.EMPTY],
    [squareEnum.EMPTY, squareEnum.oPlayer, squareEnum.EMPTY]
  ];
  component.board = board;
  component.currentPlayer = squareEnum.oPlayer;
  square.triggerEventHandler('click', null);
  component.updateBoard(rowIndex, colIndex);
  fixture.detectChanges();
  return { rowIndex, colIndex, board };
}