import { Component, inject, TemplateRef, Inject, ComponentFactoryResolver, Input, Type, ViewContainerRef, ViewChild, ComponentRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'esm-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  
  private _content: Type<Component>
  @ViewChild('viewport', {read: ViewContainerRef}) target: ViewContainerRef;
  
  componentRef: ComponentRef<Component>;

  @Input() public set content(value: Type<Component>) {
    this._content = value;
    let factory = this.componentFactoryResolver.resolveComponentFactory(this._content);
    this.componentRef = this.target.createComponent(factory);
    (this.componentRef.instance as any).context = this.data.instanceContext;
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  private componentFactoryResolver: ComponentFactoryResolver) {

  }

  ngAfterViewInit() {
    this.content = this.data.content;
  }
}