import {Component, inject, signal} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import {Router, RouterModule} from '@angular/router';
import {AuthService, LoginCredential} from '../auth.service';
import {CommonModule} from '@angular/common';
@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);
  $message= signal('')

  form = inject(FormBuilder).nonNullable.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  register() {
    if (this.form.valid) {
      this.#authService.register(this.form.value as LoginCredential).subscribe({
        next: response => {
          if (response.success) {
            this.$message.set('register success');
            this.#router.navigate(['', 'login']);
          }
        },
        error: err => {
          this.$message.set(err.error.error);
        }
      });
    }
  }
}
