import { OnInit, Type } from '@angular/core';
import { IGridData } from 'src/app/controls/grid/grid.component';
import { DialogComponent } from 'src/app/controls/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

export abstract class AbsScreenComponent<T> implements OnInit {


  data: T[];
  gridData: IGridData;

  viewState: ViewState = ViewState.view;

  constructor(private dialogSrv: MatDialog, private childComponent: Type<any>) {
    
  }

  async ngOnInit() {
    await this.absLoadData();
  }

  protected abstract buildGridData();
  protected abstract loadData(postload: () => void);
  protected abstract async update(data: T);
  protected abstract async create(data: T);
  protected abstract async delete(id: number);          
  protected abstract getEmptyT(): T;
  protected abstract getFilledT(data: any): T;

  public async onButtonClicked($event) {

    const data = this.getEmptyT();

    switch($event.action) {
      case 'new':
        this.viewState = ViewState.new;
        this.openDataDialog(data);
        break;
      case 'delete':
        this.gridData.rows.forEach(async r => {
          if (r.selected) {
            (data as any).id = parseInt(r.data[0]);
            this.viewState = ViewState.delete;
            await this.handleViewState(data);
            this.viewState = ViewState.view;
          }
        });
        this.absLoadData();
        break;
    }
  }

  public onRowSelected($event) {
    this.viewState = ViewState.edit;
    const data: T = this.getFilledT($event.data);
    this.openDataDialog(data);
  }

  private openDataDialog(data: T) {
    this.dialogSrv.open(DialogComponent, {
        "minWidth": 250,
        "data": { 
          content: this.childComponent, 
          instanceContext: data, 
          title: this.getDialogTitle()
        }
      }).afterClosed().subscribe( async (d: T) =>  {     
      if (d) {
        await this.handleViewState(d);
        await this.absLoadData();
      }
    });
  }

  private async absLoadData() {
    this.viewState = ViewState.loading;
    await this.loadData(() => {
      this.buildGridData();
      this.viewState = ViewState.view;
    });
  }

  private async handleViewState(data: T) {
    switch(this.viewState) {
      case ViewState.edit:
        this.viewState = ViewState.updating;
        await this.update(data);
        this.viewState = ViewState.view;
        break;
      case ViewState.new:
        this.viewState = ViewState.updating;
        await this.create(data);          
        this.viewState = ViewState.view;
        break;
      case ViewState.delete:
        this.viewState = ViewState.deleting;
        await this.delete((data as any).id);          
        this.viewState = ViewState.view;
    }
  }

  private getDialogTitle() {
    switch(this.viewState) {
      case ViewState.edit: return 'Edit';
      case ViewState.new:  return 'Create';     
    }
    return 'UNKOWN';
  }

}

export enum ViewState {
  edit,
  view,
  new,
  delete,
  loading,
  updating,
  deleting
}
