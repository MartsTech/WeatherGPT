import { Component } from '@angular/core';

@Component({
  selector: 'app-text',
  template: `
    <p class="text-sm font-normal text-gray-500">
      <ng-content></ng-content>
    </p>
  `,
  styles: [],
})
export class TextComponent {}
