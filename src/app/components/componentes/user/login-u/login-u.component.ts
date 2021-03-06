import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Router } from '@angular/router';
import { AuthService } from "../../../../services/auth.service";
import { userInterface } from "../../../../models/user";





@Component({
 selector: 'app-login-u',
 templateUrl: './login-u.component.html',
 styleUrls: ['./login-u.component.css']
})
export class LoginUComponent implements OnInit {
 constructor(public afAuth: AngularFireAuth, private router: Router, public authService: AuthService) { }
 public email: string = '';
 public password: string = '';
 users = [];
 ngOnInit() {
 }
/*
 onLogin(): void {
  this.authService.loginEmailUser(this.email, this.password).then(data =>{
    this.authService.getProfile().then
  })

  
    if (active == true)
            this.onLoginRedirect();
            else{ console.log("Cuenta desactivada")
          this.authService.logoutUser()}
    
}*/

 onLogin(): void {
  this.authService.loginEmailUser(this.email, this.password)
    .then((res) => {
            this.onLoginRedirect();
    }).catch(err => console.log('err', err.message));
}




onLoginGoogle(): void {
  this.authService.loginGoogleUser()
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => console.log('err', err.message));
}

 onlogout(){
   this.authService.logoutUser();
 }
  onLoginRedirect(): void{
   this.router.navigate(['inicio'])
 }
}



  



