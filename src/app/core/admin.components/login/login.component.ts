import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ServicesService } from '../../../home/services/services.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  isLoggedIn: boolean = false;
  loginForm!: FormGroup;



  constructor(private _loggedInService: ServicesService, private _formBuilder: FormBuilder, private _router: Router, private _toastr: ToastrService) {
    this._loggedInService.returnLoginValue().subscribe(log => {
      this.isLoggedIn = log;
    })
  }
  ngOnInit(): void {
    this.loginCredentialsForm();
  }


  loginCredentialsForm() {
    this.loginForm = this._formBuilder.group({
      email: new FormControl(''),
      password: new FormControl('')
    })
  }

  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    if (email === '' || password === '') this._toastr.warning('Please Login First to continue');

    if (email === 'dipendra@gmail.com' && password === 'chanja@123') {
      this._router.navigate(['home']);
      this.isLoggedIn = true;
      this._loggedInService.updateLogin(this.isLoggedIn);
      this._toastr.success('Weclome to chanja');

    }
    else {
      this._toastr.error('Invalid Username or Password')
    }
  }
}
