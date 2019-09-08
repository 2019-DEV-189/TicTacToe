import { Injectable } from "@angular/core";

@Injectable()
export class UtilService {

    checkEquality(squareItem1: string, squareItem2: string, squareItem3: string) {
        return (squareItem1!='' && squareItem1 == squareItem2 && squareItem2 == squareItem3);
    }
}