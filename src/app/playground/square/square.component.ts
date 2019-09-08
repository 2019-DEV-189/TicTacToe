import { Component, OnInit, Input } from '@angular/core';
import { squareEnum } from './squareEnum';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.css']
})
export class SquareComponent implements OnInit {

  @Input() public squareItem: squareEnum = squareEnum.EMPTY;
  @Input() public rowIndex: number;
  @Input() public colIndex: number;
  constructor() { }

  ngOnInit() {
  }

}