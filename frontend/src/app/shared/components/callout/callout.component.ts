import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

import { CheckComponent } from '@shared/icons/check/check.component';
import { ExclamationComponent } from '@shared/icons/exclamation/exclamation.component';

@Component({
  selector: 'app-callout',
  standalone: true,
  imports: [NgClass, NgIf, CheckComponent, ExclamationComponent],
  template: `
    <div
      [ngClass]="
        !warning
          ? 'border-teal-700 bg-teal-50 text-teal-700'
          : 'border-rose-700 bg-rose-50 text-rose-700'
      "
      class="mt-4 flex flex-col overflow-hidden rounded-md border-l-4 py-3 pl-4 pr-3 text-sm">
      <div class="flex items-start">
        <app-check *ngIf="!warning"></app-check>
        <app-exclamation *ngIf="warning"></app-exclamation>
        <h4 class="font-semibold">
          {{ title }}
        </h4>
      </div>
      <p class="mt-2 overflow-y-auto">
        {{ body }}
      </p>
    </div>
  `,
})
export class CalloutComponent {
  @Input() title: string = '';
  @Input() body: string = '';
  @Input() warning: boolean = false;
}
