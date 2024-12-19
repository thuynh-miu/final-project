import { Component, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import {
  MatCalendarCellClassFunction,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [MatDatepickerModule, MatCardModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  dates: Date[] = [];

  constructor() {
    const today = new Date();
    // TODO: get dates from api
    for (let d = 1; d < 7; ++d) {
      const date = new Date();
      date.setDate(today.getDate() - d);
      this.dates.push(date);
    }
  }

  isSameDate(d1: Date, d2: Date) {
    // console.log('here')
    return (
      d1.getFullYear() == d2.getFullYear() &&
      d1.getMonth() == d2.getMonth() &&
      d1.getDate() == d2.getDate()
    );
  }
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, _) => {
    const isCompleted = this.dates.some((d) => this.isSameDate(d, cellDate));
    return isCompleted ? 'bg-primary rounded-circle' : '';
  };

  dateFilter(d: Date) {
    const today = new Date();
    return d <= today;
  }
}
