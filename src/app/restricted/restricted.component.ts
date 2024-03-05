import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-restricted',
  templateUrl: './restricted.component.html',
  styleUrls: ['./restricted.component.css']
})
export class RestrictedComponent implements OnInit {
  public userLoggedIn:boolean = false;

  constructor( private router: Router, private loginServ : LoginService) { }

  ngOnInit(): void {
    if( this.loginServ.isLoggedIn()){
      this.userLoggedIn =true;
      setTimeout(() => {
      this.router.navigate(['/home']);
    }, 4000);
    }else{
      this.userLoggedIn =false;
      alert("Please Login using correct credentials");
      setTimeout(() => {
      this.router.navigate(['/login']);
    }, 4000);
    }
  }

}
