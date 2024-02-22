import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {
  public isUserLoggedIn: boolean = false;
  public logInUser: any;

  constructor(private router: Router, private toastService: ToastService) { }
  ngOnInit(): void { }

  isLoggedIn() {
    if (localStorage.getItem('loggedInUser')) {
      return this.isUserLoggedIn = true;
    }
    return this.isUserLoggedIn = false;
  }

  loggedInUserDet() {
    this.logInUser = (JSON.parse(localStorage.getItem('loggedInUser') || '{}'));
    return this.logInUser;
  }

  logIn() {
    if (this.isLoggedIn() == true && this.loggedInUserDet().userName == "admin" && this.loggedInUserDet().password == "1234") {
      this.router.navigate(['/home']);// Here admin Dashboard can be used instead of Homepage
    } else {
      alert('Welcome User! for admin login UserName: admin and password:1234(testing purpose)');
      this.router.navigate(['/home']);
    }
    this.toastService.show('Logged In Successfully',{ classname: 'bg-success text-light mt-4', delay: 4000, autohide: true});
  }

  isAdminLoggedIn() {
    this.logInUser = (JSON.parse(localStorage.getItem('loggedInUser') || '{}'));
    if (this.logInUser.userName == "admin") {
      return true;
    }
    return false;
  }
  
  logOut() {
    localStorage.removeItem('loggedInUser');
  }

}
