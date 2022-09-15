import { Component, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    for (
      let i = 1;
      i <= (this.totalPageCount < 5 ? this.totalPageCount : 5);
      i++
    ) {
      this.buttonNumbers.push(i);
    }
  }
  name = 'Angular ' + VERSION.major;
  totalPageCount = 12;
  currentHead = 1;
  currentTail = this.totalPageCount < 5 ? this.totalPageCount : 5;
  totalItemsPerBar = this.totalPageCount < 5 ? this.totalPageCount : 5;
  showPrev =
    this.currentHead == 1 || this.totalPageCount <= this.totalItemsPerBar
      ? false
      : true;
  showNext = this.totalPageCount <= this.totalItemsPerBar ? false : true;
  buttonNumbers = [];

  handleNext(): void {
    console.log('next', this.currentHead, this.currentTail);
    if (this.currentTail < this.totalPageCount) {
      this.showPrev = true;
      this.currentHead = this.currentTail + 1;
      // loop from current head + 1 till total page count.
      this.buttonNumbers = [];
      let limit =
        this.currentTail + 5 <= this.totalPageCount
          ? this.currentTail + 5
          : this.totalPageCount;
      for (let i = this.currentTail + 1; i <= limit; i++) {
        this.buttonNumbers.push(i);
        if (i === limit) {
          this.currentTail = i;
        }
      }

      console.log('after next', this.currentTail);

      if (this.totalPageCount - this.currentTail < 1) {
        this.showNext = false;
      }
    }
  }

  handlePrev(): void {
    console.log('prev', this.currentHead, this.currentTail);
    this.currentHead -= 5;
    if (this.currentTail % 5 !== 0) {
      this.currentTail -= this.currentTail % 5;
    } else {
      this.currentTail -= 5;
    }
    // loop from currentHead till currentTail.
    if (this.currentHead === 1) {
      this.showPrev = false;
    }
    this.buttonNumbers = [];
    for (let i = this.currentHead; i <= this.currentTail; i++) {
      this.buttonNumbers.push(i);
    }
    if (this.currentTail < this.totalPageCount) {
      this.showNext = true;
    }
  }
}
