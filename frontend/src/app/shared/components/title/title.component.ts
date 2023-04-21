import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-title',
  template: `
    <p class="text-6xl font-bold text-gray-500">
      <ng-content></ng-content>
    </p>
  `,
})
export class TitleComponent {}
