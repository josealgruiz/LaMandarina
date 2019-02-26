import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Router } from '@angular/router';
import { AuthService } from "../../../../services/auth.service";




@Component({
  selector: 'app-login-u',
  templateUrl: './login-u.component.html',
  styleUrls: ['./login-u.component.css']
})
export class LoginUComponent implements OnInit {
 
  constructor(public afAuth: AngularFireAuth, private router: Router, private AuthService: AuthService) { }
  public email: string = '';
  public password: string = ''; 
  ngOnInit() {
  }  

  onLogin(): void{
  this.AuthService.loginEmailUser(this.email, this.password)
    .then((res) => {
    this.onLoginRedirect();
    }).catch(err => console.log('err', err.message))
  }

  onLoginGoogle(): void{
    this.AuthService.loginGoogleUser()
    .then((res) =>{
      console.log('resUser', res);
      this.onLoginRedirect();
    }).catch(err =>console.log('err', err.message))
    
  }

  onlogout(){
    this.AuthService.logoutUser();
  }
  
  onLoginRedirect(): void{
    this.router.navigate(['inicio'])
  }
} 



 
    


