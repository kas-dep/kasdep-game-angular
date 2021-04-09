import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameBoardComponent } from './game-board.component';
import { GameOverComponent } from './game-over/game-over.component';
import { MatDialogModule } from '@angular/material/dialog';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [GameBoardComponent, GameOverComponent, InfoComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [GameBoardComponent],
})
export class GameBoardModule {}
