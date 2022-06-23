import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AppDataLayerService } from 'src/app/app-data-layer.service';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponsePayload } from '../login/login-response.payload';
import { ResetPasswordRequest } from '../reset-password/reset-password-request';
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { UpdatePasswordRequest } from '../update-password/update-password-request.payload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUsername(),
  };

  constructor(
    private httpClient: HttpClient,
    private localStorage: LocalStorageService,
    private localProductData: AppDataLayerService
  ) {}

  signup(signupRequestPayload: SignupRequestPayload): Observable<string> {
    return this.httpClient.post(
      'http://ec2-54-221-91-237.compute-1.amazonaws.com:8080/api/auth/signup',
      signupRequestPayload,
      { responseType: 'text' }
    );
  }

  login(loginRequest: LoginRequestPayload): Observable<boolean> {
    return this.httpClient
      .post<LoginResponsePayload>(
        'http://ec2-54-221-91-237.compute-1.amazonaws.com:8080/api/auth/login',
        loginRequest
      )
      .pipe(
        map((data) => {
          this.localStorage.store(
            'authenticationToken',
            data.authenticationToken
          );
          this.localStorage.store('refreshToken', data.refreshToken);
          this.localStorage.store('expiresAt', data.expiresAt);
          this.localStorage.store('username', data.username);

          this.loggedIn.emit(true);
          this.username.emit(data.username);
          this.localProductData.username = data.username;
          this.localProductData.loadUserProducts();
          return true;
        })
      );
  }

  logout(): void {
    this.httpClient
      .post(
        'http://ec2-54-221-91-237.compute-1.amazonaws.com:8080/api/auth/logout',
        this.refreshTokenPayload,
        {
          responseType: 'text',
        }
      )
      .subscribe(
        (data) => {},
        (error) => {
          throwError(error);
        }
      );
    this.localProductData.flushUserProducts();
    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
    this.localStorage.clear('username');
  }

  refreshToken(): Observable<LoginResponsePayload> {
    return this.httpClient
      .post<LoginResponsePayload>(
        'http://ec2-54-221-91-237.compute-1.amazonaws.com:8080/api/auth/refresh/token',
        this.refreshTokenPayload
      )
      .pipe(
        tap((response) => {
          this.localStorage.store(
            'authenticationToken',
            response.authenticationToken
          );
          this.localStorage.store('expiresAt', response.expiresAt);
        })
      );
  }

  resetPassword(resetPasswordRequest: ResetPasswordRequest): Observable<any> {
    return this.httpClient.post(
      'http://ec2-54-221-91-237.compute-1.amazonaws.com:8080/api/auth/reset-password',
      resetPasswordRequest
    );
  }

  updatePassword(updatePasswordRequest: UpdatePasswordRequest) {
    return this.httpClient.post(
      'http://ec2-54-221-91-237.compute-1.amazonaws.com:8080/api/auth/account-update-password',
      updatePasswordRequest
    )
  }

  getRefreshToken(): string {
    return this.localStorage.retrieve('refreshToken');
  }

  getJwtToken(): string {
    return this.localStorage.retrieve('authenticationToken');
  }

  getUsername(): string {
    return this.localStorage.retrieve('username');
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
}
