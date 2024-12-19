import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';

export interface LoginCredential {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export interface AuthState {
  _id: string;
  username: string;
  accessToken: string;
}

export type Token = {
  _id: string,
  username: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #httpClient = inject(HttpClient);
  readonly #router = inject(Router);

  $state = signal<AuthState>({
    _id: '',
    username: '',
    accessToken: '',
  });

  isLoggedIn() {
    return this.$state()._id;
  }

  login(loginCredential: LoginCredential) {
    return this.#httpClient.post<{success: boolean, data: { token: string }}>(`${environment.SERVER_URL}/users/signin`, loginCredential);
  }

  register(registerCredential: LoginCredential) {
    return this.#httpClient.post<{success: boolean, data: string}>(`${environment.SERVER_URL}/users/signup`, registerCredential);
  }

  logout() {
    this.$state.set({
      _id: '',
      username: '',
      accessToken: '',
    });
    this.#router.navigate(['', 'signin']);
  }
}
