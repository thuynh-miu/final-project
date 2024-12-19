import { Component, inject } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { Entry } from '../interfaces/entry';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import {
  MatButtonToggleChange,
  MatButtonToggleModule,
} from '@angular/material/button-toggle';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-entries',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatButtonModule,
    MatButtonToggleModule,
    RouterOutlet,
  ],
  templateUrl: './entries.component.html',
  styleUrl: './entries.component.css',
})
export class EntriesComponent {
  readonly #router = inject(Router);
  entries: Entry[] = [
    {
      _id: '1',
      title: 'Test',
      content: '',
      date: new Date(),
    },
    {
      _id: '2',
      title: 'Test new',
      content: '',
      date: new Date(),
    },
  ];

  handleEntrySelect(event: MatButtonToggleChange) {
    this.#router.navigate([`entries/${event.value}`]);
  }
}
