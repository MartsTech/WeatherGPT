import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TextComponent } from './text.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TextComponent],
  exports: [TextComponent],
})
export class TextModule {}
