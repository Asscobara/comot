import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, OnChanges {

  @Input() public data: IGridData;
  
  @Output() public rowSelected: EventEmitter<any> = new EventEmitter();

  public columnsStyleProperty: string; 

  constructor() { 
  
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.currentValue) {
       this.setColumnsStyleProperty(); 
    }
  }

  ngOnInit(): void {

  }

  public onRowSelected($event) {
    if(this.rowSelected) {
      this.rowSelected.emit($event);
    }
  }

  private setColumnsStyleProperty() {
    this.columnsStyleProperty = `auto`;
    for(let i = 1; i < this.data.columns.length; i++) {
      this.columnsStyleProperty += ` 1fr`
    }
  }
}

export interface IGridData {
  columns: string[];
  rows: {
    data: string[]
  }[]
}
