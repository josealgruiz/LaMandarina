import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../services/auth.service";
import { Router } from "@angular/router";
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { stringify } from '@angular/compiler/src/util';


@Component({
 selector: 'app-register-u',
 templateUrl: './register-u.component.html',
 styleUrls: ['./register-u.component.css']
})
export class RegisterUComponent implements OnInit {

 constructor( private router: Router, private authService: AuthService, private storage: AngularFireStorage ) { }
 public email: string = '';
  public password: string = '';

 ngOnInit() {
 }


 onAddUser(){
  this.authService.registerUser(this.email, this.password)
  .then((res) =>{
    this.router.navigate(['inicio']);
  }).catch(err => console.log('err', err.message));
}
onLoginGoogle(): void {
  this.authService.loginGoogleUser()
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => console.log('err', err.message));
}

onLoginRedirect(): void {
  this.router.navigate(['inicio']);
}

}
