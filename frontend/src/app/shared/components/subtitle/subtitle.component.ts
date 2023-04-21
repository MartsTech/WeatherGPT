import { Component } from '@angular/core';

@Component({
  selector: 'app-subtitle',
  template: `
    <p class="text-xl font-normal text-gray-400">
      <ng-content></ng-content>
    </p>
  `,
  styles: [],
})
export class SubtitleComponent {}
