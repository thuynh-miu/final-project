import {
  Component,
  effect,
  inject,
  Input,
  input,
  InputSignal,
  Signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { Entry } from '../interfaces/entry';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-entry',
  imports: [DatePipe],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.css',
})
export class EntryComponent {
  id = input.required();
  entry!: Entry;

  constructor() {
    setTimeout(() => {
      this.entry = {
        title: 'Tile',
        content: '<div>Hello World</div>',
        _id: '1',
        date: new Date(),
      };
    }, 1000);
  }

  onClick() {
    console.log('here', this.id());
  }
}
