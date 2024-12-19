import {Component, inject, signal} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {Router, RouterModule} from '@angular/router';
import {AuthService, Token} from '../auth.service';
import { jwtDecode } from 'jwt-decode';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);
  $message = signal('');

  form = inject(FormBuilder).nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  onLogginButtonClick() {
    this.#authService.login({
      username: this.form.controls.username.value,
      password: this.form.controls.password.value,
    }).subscribe({
      next: response => {
        if (response.success) {
          const decoded = jwtDecode(response.data.token) as Token;
          this.#authService.$state.set({
            _id: decoded._id,
            username: decoded.username,
            accessToken: response.data.token,
          });
          this.#router.navigate(['']);
        }},
      error: err => {
        this.$message.set(err.error.error);
      }
    });
  }
}
