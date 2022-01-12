import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from '../shared/auth.service';
import { ResetPasswordRequest } from './reset-password-request';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  resetPasswordRequest!: ResetPasswordRequest;

  isError: boolean = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });

    this.resetPasswordRequest = {
      username: '',
      email: '',
    };
  }

  reset(): void {
    this.resetPasswordRequest.email = this.resetForm.get('email')?.value;
    this.resetPasswordRequest.username = this.resetForm.get('username')?.value;
    this.authService.resetPassword(this.resetPasswordRequest).subscribe(
      (response: any) => {
        this.isError = false;
        alert("Please check your email to reset your password.")
        this.router.navigateByUrl('/login');
      },
      (err) => {
        throwError(err);
        this.isError = true;
      }
    );
  }
}
