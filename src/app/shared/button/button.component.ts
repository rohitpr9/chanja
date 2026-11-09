import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button
      type="button"
      [ngClass]="{
        'mt-4 border-2 rounded-2': !isDelete,
        'border-0 background-transparent': isDelete,
      }"
      style="padding: 2px 10px; background-color: transparent"
      (click)="onEmitClickBtn.emit()"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [],
})
export class ButtonComponent {
  @Input() isDelete!: boolean;
  @Output() onEmitClickBtn: EventEmitter<void> = new EventEmitter();
}
