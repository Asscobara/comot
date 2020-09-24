import { OnInit, Type, ChangeDetectorRef } from '@angular/core';
import { IGridData } from 'src/app/controls/grid/grid.component';
import { DialogComponent } from 'src/app/controls/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from 'src/app/popups/popup/popup.component';
import { SessionServiceService } from 'src/app/services/session-service.service';
import { DeviceDetectorService } from 'ngx-device-detector';

export abstract class AbsScreenComponent<T> implements OnInit {

  data: T[];
  gridData: IGridData;

  viewState: ViewState = ViewState.view;
  ViewState = ViewState;

  useScreenMargin = true;

  constructor(
    protected dialogSrv: MatDialog, 
    protected changeDetect: ChangeDetectorRef, 
    protected childComponent: Type<any>, 
    protected sessionSrv: SessionServiceService, 
    protected changeDetector: ChangeDetectorRef, 
    protected deviceDetectorService: DeviceDetectorService) {
    
  }

  async ngOnInit() {
    this.changeDetector.detectChanges();
    this.absLoadData();
  }

  protected abstract buildGridData();
  protected abstract async loadData();
  protected abstract async update(data: T);
  protected abstract async create(data: T);
  protected abstract async delete(id: number);          
  protected abstract getEmptyT(): T;
  
  public async onButtonClicked($event) {

    const data = this.getEmptyT();

    switch($event.btn.action) {
      case ButtonActions.new:
        this.viewState = ViewState.new;
        this.openDataDialog(data);
        break;
      case ButtonActions.delete:
        this.openConfirmDialog(() => {
          $event.selected.forEach(async r => {
            (data as any).id = r.id;
            this.viewState = ViewState.delete;
            await this.handleViewState(data);
            this.viewState = ViewState.view;
            this.absLoadData();
          });        
        });
        break;
        case ButtonActions.custome:
          $event.btn.actionData.selected = $event.selected;
          this.handleCustomeAction($event.btn);
          break;
    }
  }

  protected handleCustomeAction(btn: any) {

  }

  public onRowSelected($event) {
    this.viewState = ViewState.edit;
    const data: T = $event;
    this.openDataDialog(data);
  }

  private openDataDialog(data: T) {

    const mobileDialogInfo =  this.deviceDetectorService.isMobile() ? {
      position: {
        top: '0px',
        right: '0px'
      },
      height: '100%',
      width: '100vw',
      panelClass: 'full-screen-modal',
    } : {};

    this.dialogSrv.open(DialogComponent, {
      ...mobileDialogInfo,
      maxWidth: '100vw',
        "minWidth": 250,
        "data": { 
          content: this.childComponent, 
          instanceContext: data, 
          disabled: this.sessionSrv.user?.role_id != 2,
          title: this.getDialogTitle()
        }
      }).afterClosed().subscribe( async (d: T) =>  {     
        if (d) {
          await this.handleViewState(d);
        }
        this.absLoadData();      
      });
  }

  private async absLoadData() {
    this.viewState = ViewState.loading;
    this.data = (await this.loadData()).data;
    this.buildGridData();   
    this.viewState = ViewState.view;
    this.changeDetect.detectChanges();  
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
      case ViewState.edit: return $localize`Edit`;
      case ViewState.new:  return $localize`Create`;     
    }
    return 'UNKOWN';
  }

  private openConfirmDialog(callback: () => void) {
    const dialogRef = this.dialogSrv.open(PopupComponent,{
      data:{
        message: $localize`Are you sure want to delete?`,
        buttonText: {
          ok: $localize`Save`,
          cancel: $localize`No`
        }
      }
    });
    // const snack = this.snackBar.open('Snack bar open before dialog');

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
       // snack.dismiss();
       callback();
      //  snack.dismiss();
       // this.snackBar.open('Closing snack bar in a few seconds', 'Fechar', {
       //   duration: 2000,
       // });
      }
    });
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

export enum ButtonActions {
  new = 'new',
  delete = 'delete',
  custome = 'custome'
}
