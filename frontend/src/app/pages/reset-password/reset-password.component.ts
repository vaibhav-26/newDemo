import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  ToastService,
} from 'angular-toastify';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  ResetPasswordForm!: FormGroup;
  invalidloginflag: boolean = false;
  loading = false;
  error = '';
  user: string;

  constructor(
    private _toastService: ToastService,
    private router: Router,
    private userservice: UserService,
  ) { }

  ngOnInit(): void {
    this.ResetPasswordForm = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    })
  }

  submitForm() {
    if (this.ResetPasswordForm.valid) {
      this.invalidloginflag = false
      this.userservice.resetPassword(
        this.ResetPasswordForm.value
      ).subscribe((result: any) => {
        console.log(result)
        this._toastService.success("Invalid Username or Password")
      }, error => {
        if (error)
          this._toastService.error("Invalid Username or Password")
      })
    } else {
      this.invalidloginflag = true
      this._toastService.error('invalid-Credentials');
    }
  }

  get f() {
    return this.ResetPasswordForm.controls;
  }
}
