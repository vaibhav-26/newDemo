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
import { PATTERNS } from 'src/app/utils/constants/constants';
import { UserService } from '../../core/services/user/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mfa',
  templateUrl: './mfa.component.html',
  styleUrls: ['./mfa.component.scss'],
})
export class MFAComponent implements OnInit {
  Otp!: FormGroup;
  invalidloginflag: boolean = false;
  params: any;
  constructor(
    private router: Router,
    private _toastService: ToastService,
    private userservice: UserService,
    public route: ActivatedRoute
  ) {
    this.route.url.subscribe((params) => {
      this.params = params[0].path;
    });
  }

  ngOnInit() {
    this.Otp = new FormGroup({
      otp: new FormControl(null, [
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(6),
        Validators.pattern(PATTERNS.MFA),
      ]),
    });
  }

  submitForm() {
    let otpVal = this.Otp.controls['otp'].value;
    let userName = localStorage.getItem(`userName`);
    let email = localStorage.getItem('email');

    if (this.Otp.valid || this.Otp.controls['otp'].value != '') {
      let body = { userName: userName, otp: otpVal, email: email };
      this.userservice.VerifyOtp(body).subscribe(
        (result: any) => {
          localStorage.setItem('user', JSON.stringify(result.user));
          localStorage.setItem('token', JSON.stringify(result.token));
          this.invalidloginflag = false;
        },
        (error) => {
          if (error) this._toastService.error('invalid-otp');
        },
        () => {
          if (this.params === 'forgetpassword') {
            this.router.navigate(['/resetpassword']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        }
      );
    } else {
      this.router.navigate(['/login']);
    }
  }

  get f() {
    return this.Otp.controls;
  }
}
