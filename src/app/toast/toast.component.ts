// toast.component.ts
import {Component, TemplateRef} from '@angular/core';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <ngb-toast
      *ngFor="let toast of toastService.toasts"
      [header]="toast.headertext"
      [class]="toast.classname"
      [autohide]="toast.autohide"
      [delay]="toast.delay || 5000"
      (hide)="toastService.remove(toast)"
    >
      <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
        <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
      </ng-template>

      <ng-template #text>{{ toast.textOrTpl }}</ng-template>
    </ngb-toast>
  `,
  // host: {'[class.ngb-toasts]': 'true'}
  host: {'class': 'toast-container position-fixed top-0 end-0 mt-4', 'style': 'z-index: 1200;'},
  styleUrls:['toast.component.css']
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  isTemplate(toast:any) { return toast.textOrTpl instanceof TemplateRef; }
}