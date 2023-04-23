import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-title',
  template: `
    <p class="text-4xl font-bold text-gray-500 sm:text-6xl">
      <ng-content></ng-content>
    </p>
  `,
})
export class TitleComponent {}
