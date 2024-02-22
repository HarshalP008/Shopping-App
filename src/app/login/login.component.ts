import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  myLoginForm: FormGroup | any;
  userDetails: any;

  constructor(private fbLogin: FormBuilder, private router: Router, private loginServ: LoginService) { }

  ngOnInit(): void {
    this.myLoginForm = this.fbLogin.group({
      userName: this.fbLogin.control('', [Validators.required, Validators.minLength(4)]),
      password: this.fbLogin.control('', Validators.required),
    })
  }
  submit() {
    let loggedInUser = this.myLoginForm.value;
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    this.userDetails= JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    console.log(this.userDetails);
    
    // if (this.userDetails.userName === 'admin' && this.userDetails.password === "1234") {
    //   this.router.navigate(['/home'])
    //   } else {
    //     alert('wrong Username or password');
    //   }
    this.loginServ.logIn();
    }
}
