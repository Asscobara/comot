import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit, OnChanges {

  @Input() public data: IGridData;
  
  @Output() public rowSelected: EventEmitter<any> = new EventEmitter();
  @Output() public buttonClicked: EventEmitter<any> = new EventEmitter();

  public Object = Object;  
  constructor() { 
  
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && changes.data.currentValue) {
      this.displayedColumns = this.data.columns.map(col => col.fieldName);
      this.dataSource = new MatTableDataSource<any>(this.data.rows);
      this.selection = new SelectionModel<any>(true, []);  
   }
  }

  ngOnInit(): void {

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

  public displayedColumns: string[];
  public dataSource:  MatTableDataSource<any>;
  public selection: SelectionModel<any>;

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }

}

export interface IGridColumn {
  displayName: string,
  fieldName: string
}

export interface IGridData {
  columns: IGridColumn[];
  rows: any[];
  canSelectItem: boolean;
  buttons: {
    title: string;
    action: string;
  }[];
}
