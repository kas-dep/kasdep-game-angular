import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from '@angular/router';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss'],
})
export class GameOverComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) private data: Data) {}

  sumOfDiceRolls = 0;
  header = '';
  average = '';

  ngOnInit(): void {
    const { gameSummary, message } = this.data;

    this.sumOfDiceRolls = gameSummary.length;
    this.header = message;
    this.average = (gameSummary.reduce((a: number, b: number) => a + b) / this.sumOfDiceRolls).toFixed(2);
  }
}
