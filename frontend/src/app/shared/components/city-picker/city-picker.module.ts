import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { CityPickerComponent } from './city-picker.component';

@NgModule({
  imports: [CommonModule, FormsModule, NgSelectModule],
  declarations: [CityPickerComponent],
  exports: [CityPickerComponent],
})
export class CityPickerModule {}
