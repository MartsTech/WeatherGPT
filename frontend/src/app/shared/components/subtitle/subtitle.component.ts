import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-subtitle',
  template: `
    <p class="text-xl font-normal text-gray-400">
      <ng-content></ng-content>
    </p>
  `,
})
export class SubtitleComponent {}
