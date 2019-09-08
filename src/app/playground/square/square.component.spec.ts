import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SquareComponent } from './square.component';
import { squareEnum } from './squareEnum';

describe('SquareComponent', () => {
  let component: SquareComponent;
  let fixture: ComponentFixture<SquareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SquareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('square has three states `EMPTY` OR `X` OR `O`', function() {

    it('should have an EMPTY state initially', () => {
      component.colIndex = 0;
      component.rowIndex = 0;
      expect(fixture.nativeElement.querySelector('div').innerText).toEqual(squareEnum.EMPTY);
    });

    it('should update with `X` when Player `X` makes a move', () => {
      component.colIndex = 1;
      component.rowIndex = 1;
      component.squareItem = squareEnum.xPlayer;
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('div').innerText).toEqual(squareEnum.xPlayer);
    });

    it('should update with `O` when Player `O` makes a move', () => {
      component.colIndex = 2;
      component.rowIndex = 2;
      component.squareItem = squareEnum.oPlayer;
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('div').innerText).toEqual(squareEnum.oPlayer);
    });
  });
});