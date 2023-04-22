import { Component, Input } from '@angular/core';

import { NgClass } from '@angular/common';
import type { MetricColor } from './metric-types';

@Component({
  selector: 'app-metric',
  standalone: true,
  imports: [NgClass],
  template: `
    <div
      [ngClass]="
        {
          yellow: 'border-yellow-500',
          green: 'border-green-500',
          rose: 'border-rose-500',
          cyan: 'border-cyan-500',
          violet: 'border-violet-500',
          none: ''
        }[color]
      "
      class="relative w-full rounded-lg border-t-4 bg-white p-6 text-left shadow ring-1 ring-gray-200">
      <p class="text-sm font-normal text-gray-500">{{ title }}</p>
      <p class="text-3xl font-semibold text-gray-700">{{ value }}</p>
    </div>
  `,
})
export class MetricComponent {
  @Input() title: string = '';
  @Input() value: string = '';
  @Input() color: MetricColor = 'none';
}
