import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css']
})
export class PagenotfoundComponent implements OnInit {
  public userLoggedIn:boolean = false;

  constructor( private router: Router, private loginServ : LoginService ) { }

  ngOnInit(): void {
    if( this.loginServ.isLoggedIn()){
      this.userLoggedIn =true;
      setTimeout(() => {
      this.router.navigate(['/home']);
    }, 2000);
    }else{
      this.userLoggedIn =false;
      alert("Page not found, Please Login using correct credentials");
      setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
    }
  }

}
