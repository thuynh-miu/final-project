import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { WriteComponent } from './write/write.component';
import { EntriesComponent } from './entries/entries.component';
import { EntryComponent } from './entry/entry.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'write',
    component: WriteComponent,
  },
  {
    path: 'entries',
    component: EntriesComponent,
    children: [
      {
        path: ':id',
        component: EntryComponent,
      },
    ],
  },
];
