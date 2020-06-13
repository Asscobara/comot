import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, OnChanges {

  @Input() public data: IGridData;
  
  @Output() public rowSelected: EventEmitter<any> = new EventEmitter();
  @Output() public buttonClicked: EventEmitter<any> = new EventEmitter();

  public columnsStyleProperty: string; 

  constructor() { 
  
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue) {
       this.setColumnsStyleProperty(); 
    }
  }

  ngOnInit(): void {

  }

  public onRowSelected($event, row) {
    $event.stopPropagation();
    if(this.rowSelected) {
      this.rowSelected.emit(row);
    }
  }

  public onButtonClick($event) {
    if(this.buttonClicked) {
      this.buttonClicked.emit($event);
    }
  }

  public onCheckRow($event, row) {
    row.selected = $event.toElement.checked;
    $event.stopPropagation();
  }

  public onCheckAllRows($event) {
    $event.stopPropagation();
    let selected = $event.toElement.checked;
    this.data.rows.forEach(r => r.selected = selected);
  }

  private setColumnsStyleProperty() {
    
    this.columnsStyleProperty = `auto`;

    if (this.data.canSelectItem ) {
      this.columnsStyleProperty += ` auto`;  
    }

    for(let i = 1; i < this.data.columns.length; i++) {
      this.columnsStyleProperty += ` 1fr`
    }

  }
}

export interface IGridData {
  columns: string[];
  rows: {
    selected: boolean;
    data: string[]
  }[];
  canSelectItem: boolean;
  buttons: {
    title: string;
    action: string;
  }[];
}
