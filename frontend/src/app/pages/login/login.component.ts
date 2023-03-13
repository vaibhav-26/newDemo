import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  ToastService,
  AngularToastifyModule,
  ToastifyToastContainerComponent,
} from 'angular-toastify';
import { UserService } from '../../core/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  LoginuserForm!: FormGroup;
  invalidloginflag: boolean = false;
  loading = false;
  error = '';
  user: string;
  constructor(
    private _toastService: ToastService,
    private router: Router,
    private userservice: UserService
  ) {}

  ngOnInit() {
    this.LoginuserForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  submitForm() {
    if (this.LoginuserForm.valid) {
      this.invalidloginflag = false;
      this.userservice.Login(this.LoginuserForm.value).subscribe(
        (result: any) => {
          if (result) {
            let userData = result.user;
            localStorage.setItem('userName', userData.userName);
            localStorage.setItem('email', userData.email);
            this.router.navigate(['mfa/login']);
          }
        },
        (error) => {
          if (error) this._toastService.error('Invalid Username or Password');
        }
      );
    } else {
      this.invalidloginflag = true;
      this._toastService.error('invalid-Credentials');
    }
  }

  get f() {
    return this.LoginuserForm.controls;
  }
}
