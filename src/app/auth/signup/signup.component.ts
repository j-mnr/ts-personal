import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayload } from './signup-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupRequestPayload: SignupRequestPayload;
  signupForm!: FormGroup;

  passwordsMatch: boolean = false;
  @ViewChild('confirmPassword') confirmPassword!: any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.signupRequestPayload = {
      email: '',
      username: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          // https://regex101.com/r/cS0gC5/1
          Validators.pattern(
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/gm
          ),
        ],
      ],
    });
  }

  signup(): void {
    this.signupRequestPayload.email = this.signupForm.get('email')?.value;
    this.signupRequestPayload.username = this.signupForm.get('username')?.value;
    this.signupRequestPayload.password = this.signupForm.get('password')?.value;

    this.authService.signup(this.signupRequestPayload).subscribe(
      () => {
        this.router.navigate(['/login'], { queryParams: { registered: true } });
        alert('Please check your email to complete registration.');
      },
      (err) => {
        alert('Sign Up Failed. Please check all fields and try again.');
      }
    );
  }

  checkPasswords(): void {
    let password = this.signupForm.get('password')?.value;
    let confirmPassword = this.confirmPassword.nativeElement.value;

    if (password === confirmPassword) {
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = false;
    }
  }
}
