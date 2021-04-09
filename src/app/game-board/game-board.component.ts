import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IDotsEnum } from './game-board-model';
import { GameOverComponent } from './game-over/game-over.component';
import { InfoComponent } from './info/info.component';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss'],
})
export class GameBoardComponent {
  dotsEnum: IDotsEnum = {
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
  };

  isDisabled = false;
  currentPosition = 0;
  diceResult = 0;
  allDiceResults: number[] = [];
  fishPosition = `board-game-field-0`;
  over20 = 0;
  shake = `shakeDice`;
  move: any;
  diceDotsClass = '';
  fields: string[] = Array.from(Array(21).keys()).map((item) =>
    item === 0
      ? `start`
      : [12, 19].includes(item)
      ? `board-game-field-${item} special-field`
      : `board-game-field-${item}`
  );

  constructor(private dialog: MatDialog) {}

  setFishPosition(position: number) {
    this.fishPosition = `board-game-field-${position}`;
  }

  resetGame() {
    this.diceResult = 0;
    this.allDiceResults = [];
    this.currentPosition = 0;
    this.setFishPosition(0);
  }

  openGameOverDialog(gameResult: string) {
    const dialog = this.dialog.open(GameOverComponent, {
      width: '30vw',
      data: {
        message: gameResult,
        gameSummary: this.allDiceResults,
      },
    });
    dialog.afterClosed().subscribe(() => {
      this.resetGame();
    });
  }

  specialField(fieldNumber: number) {
    if (fieldNumber === 12) {
      if (this.currentPosition === fieldNumber) {
        this.openGameOverDialog('Przegrana!');
      }
    } else if (fieldNumber === 20) {
      if (this.currentPosition === fieldNumber && this.over20 > 0) {
        clearInterval(this.move);
        this.isDisabled = true;
        let i = this.over20;
        const goBack = setInterval(() => {
          this.isDisabled = true;
          i--;
          this.currentPosition = this.currentPosition - 1;
          this.setFishPosition(this.currentPosition);

          if (i <= 0) {
            clearInterval(goBack);
            this.specialField(19);
            this.isDisabled = false;
          }
        }, 500);
      } else if (this.currentPosition === fieldNumber && this.over20 === 0) {
        this.openGameOverDialog('Wygrana!');
      }
    } else if (fieldNumber === 19) {
      if (this.currentPosition === fieldNumber) {
        let i = 8;
        this.isDisabled = true;
        const goToEleven = setInterval(() => {
          this.isDisabled = true;
          i--;
          this.currentPosition = this.currentPosition - 1;
          this.setFishPosition(this.currentPosition);

          if (i <= 0) {
            clearInterval(goToEleven);
            this.isDisabled = false;
          }
        }, 500);
      }
    }
  }

  throwADice() {
    this.isDisabled = true;
    const result = Math.floor(Math.random() * 6 + 1);
    this.allDiceResults.push(result);
    this.diceResult = result;

    this.diceDotsClass = `fas fa-dice-${this.dotsEnum[this.diceResult]}`;
    this.shake = `shakeDice`;
    const positionToGo = this.currentPosition + result;
    this.over20 = positionToGo - 20;

    let i = 0;
    this.move = setInterval(() => {
      this.shake = '';
      this.isDisabled = true;
      i++;
      this.currentPosition = this.currentPosition + 1;
      this.setFishPosition(this.currentPosition);
      if (this.currentPosition === 20) {
        this.specialField(this.currentPosition);
      }

      if (i >= result) {
        if ([12, 19].includes(this.currentPosition)) {
          this.specialField(this.currentPosition);
        }

        clearInterval(this.move);

        this.isDisabled = false;
      }
    }, 500);
  }

  openInfoDialog() {
    const dialog = this.dialog.open(InfoComponent, {
      width: '50vw',
    });
    dialog.afterClosed().subscribe(() => {});
  }
}
