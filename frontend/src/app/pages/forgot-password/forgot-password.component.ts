import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormGroup,FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user/user.service';
import {ToastService} from 'angular-toastify'

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  Forgotpassword!: FormGroup;
  invalidloginflag: boolean = false;
  constructor(
    private router: Router,
    public userService: UserService,
    private _toastService:ToastService ,
    private formBuilder: FormBuilder
  ){ }

  ngOnInit(){
    this.Forgotpassword = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]),
    })
  }

  submitForm(){
    if(this.Forgotpassword.valid){
      localStorage.setItem('email',this.Forgotpassword.controls['email'].value)
      this.userService.resetPassword({email:this.Forgotpassword.controls['email'].value}).subscribe(result => {
        this.router.navigate(['/mfa/forgetpassword'])
      },
      error => {
        if(error)
        this._toastService.error('invalid-Email-id');
      })
    }else{
     
    }
  }

  get f(){
    return this.Forgotpassword.controls;
  }
  
}
