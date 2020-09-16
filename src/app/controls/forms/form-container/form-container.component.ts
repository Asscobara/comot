import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css']
})
export class FormContainerComponent implements OnInit {

  @Input() rows: number;
  @Input() cols: number;

  public get className() {
    return `form-container-${this.cols}-${this.rows}`;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
