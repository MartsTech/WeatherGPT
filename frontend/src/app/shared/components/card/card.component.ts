import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

import type { CardBackground } from './card-types';

@Component({
  standalone: true,
  selector: 'app-card',
  imports: [NgClass],
  template: `
    <div
      [ngClass]="
        {
          white: 'bg-white',
          blue: 'bg-gradient-to-br from-[#394F68] to-[#183B7E]'
        }[background]
      "
      class="relative w-full rounded-lg border-blue-500 bg-white p-6 text-left shadow ring-1 ring-gray-200">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {
  @Input() background: CardBackground = 'white';
}
