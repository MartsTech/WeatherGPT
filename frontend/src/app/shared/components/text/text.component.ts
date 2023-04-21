import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-text',
  template: `
    <p class="text-sm font-normal text-gray-500">
      <ng-content></ng-content>
    </p>
  `,
})
export class TextComponent {}
