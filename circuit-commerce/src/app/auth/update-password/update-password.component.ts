import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { UpdatePasswordRequest } from './update-password-request.payload';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
})
export class UpdatePasswordComponent implements OnInit {
  updateForm!: FormGroup;
  updatePasswordRequest: UpdatePasswordRequest;
  passwordsMatch: boolean = false;
  @ViewChild('confirmPassword') confirmPassword!: any;

  constructor(
    private authService: AuthService,
    private activedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.updatePasswordRequest = {
      password: '',
      token: '',
    };
  }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      password: ['', [Validators.required]],
    });
  }

  updatePassword(): void {
    this.updatePasswordRequest.password = this.updateForm.get('password')?.value;
    this.updatePasswordRequest.token = this.activedRoute.snapshot.params?.token;
    this.authService
      .updatePassword(this.updatePasswordRequest)
      .subscribe((data) => {
        this.router.navigateByUrl('/login');
      }, (err) => {
        
      });
  }

  checkPasswords(): void {
    let password = this.updateForm.get('password')?.value;
    let confirmPassword = this.confirmPassword.nativeElement.value;

    if (password === confirmPassword) {
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = false;
    }
  }
}
