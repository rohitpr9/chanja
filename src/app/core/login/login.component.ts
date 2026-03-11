import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public inputType: boolean = false;


  public formGroup!: FormGroup

  constructor(private _formBuilder: FormBuilder, private _router: Router, private _toastr: ToastrService) {

  }


  ngOnInit(): void {
    this._buildForm()
  }

  public onClickPasswordType() {
    this.inputType = !this.inputType
  }


  private _buildForm(): void {
    this.formGroup = this._formBuilder.group({
      email: '',
      password: ''
    })
  }


  public onSubmit(): void {
    localStorage.setItem('login', JSON.stringify(this.formGroup.value))
    const raw = localStorage.getItem('login');
    if (!raw) {
      return
    }
    const loginCredential = JSON.parse(raw)
    if (loginCredential.email === 'chanja@gmail.com' && loginCredential.password === 'chanja@123') {
      this._router.navigate(['home']);
      this._toastr.success('Logged in succesfully')
    }
    else {
      this._toastr.error('User name or password not correct')

    }
  }

}
