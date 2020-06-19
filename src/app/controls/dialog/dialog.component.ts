import { Component, inject, TemplateRef, Inject, ComponentFactoryResolver, Input, Type, ViewContainerRef, ViewChild, ComponentRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'esm-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent {
  
  public orgInstanceContext: any;
  public title: string;

  private _content: Type<Component>
  @ViewChild('viewport', {read: ViewContainerRef}) target: ViewContainerRef;
  
  componentRef: ComponentRef<Component>;

  @Input() public set content(value: Type<Component>) {
    this._content = value;
    let factory = this.componentFactoryResolver.resolveComponentFactory(this._content);
    this.componentRef = this.target.createComponent(factory);
    (this.componentRef.instance as any).context = this.data.instanceContext;
  }

  public get formGroup(): FormGroup {
      let t = (this.componentRef?.instance as any);
      return t?.formGroup;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private componentFactoryResolver: ComponentFactoryResolver, private changeDetect: ChangeDetectorRef) {
    this.orgInstanceContext = null;
  }

  ngAfterViewInit() {
    this.title = this.data.title;
    this.content = this.data.content;
    this.changeDetect.detectChanges();    
  }
}