import { Component, OnInit } from '@angular/core';
import * as shuffle from 'lodash/fp/shuffle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cards: PolyTest.Card[];
  totalSeconds = 0;
  timer: any = 0;
  currentTime: PolyTest.Time = { hour: 0, minute: 0, second: 0 };
  isGameCompleted = false;

  ngOnInit() {
    this.cards = this.shuffleCards();
  }

  private shuffleCards(): PolyTest.Card[] {
    const ids = ['a', 'b', 'c', 'd', 'e', 'f'];
    const cards = [...ids, ...ids];
    const imgBaseUrl = 'assets/images/avengers/%img.jpg';
    const list = cards.map((card, id) => (
      {
        id,
        coverImageUrl: imgBaseUrl.replace('%img', 'cover'),
        imageUrl: imgBaseUrl.replace('%img', 'card-' + card),
        isMatched: false,
        isFlipped: false
      }
    ));

    return shuffle(list);
  }

  resetGame() {
    this.cards = this.shuffleCards();
    this.totalSeconds = 0;
    this.timer = clearInterval(this.timer);
    this.currentTime = { hour: 0, minute: 0, second: 0 };
    this.isGameCompleted = false;
  }

  // when click on any card first time, start the game timer 
  startGame() {
    // game is started
    if (this.timer) {
      return;
    }

    this.totalSeconds = 0;
    this.timer = setInterval(() => this.updateTime(), 1000);
  }

  stopGame() {
    this.timer = clearInterval(this.timer);
    this.isGameCompleted = true;
  }

  // update the time every second
  updateTime() {
    this.totalSeconds++;

    const oneSecond = 1;
    const secondsInMinute = oneSecond * 60;
    const secondsInHour = 60 * secondsInMinute;
    const minutesInHour = 60;

    const hours = Math.floor(this.totalSeconds / secondsInHour);
    const minutes = Math.floor(this.totalSeconds / secondsInMinute) - (hours * minutesInHour);
    const seconds = this.totalSeconds - (hours * secondsInHour + minutes * secondsInMinute);

    this.currentTime = { hour: hours, minute: minutes, second: seconds };
  }
}
