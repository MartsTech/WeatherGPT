import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, NgSelectModule],
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent {}
