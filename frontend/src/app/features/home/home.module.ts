import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CardModule } from '@shared/components/card/card.module';
import { DividerModule } from '@shared/components/divider/divider.module';
import { SubtitleModule } from '@shared/components/subtitle/subtitle.module';
import { TitleModule } from '@shared/components/title/title.module';

import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    CardModule,
    TitleModule,
    SubtitleModule,
    DividerModule,
  ],
  declarations: [HomeComponent],
  bootstrap: [HomeComponent],
})
export class HomeModule {}
