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