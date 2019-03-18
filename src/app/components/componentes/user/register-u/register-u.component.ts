import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../../../services/auth.service";
import { Router } from "@angular/router";

@Component({
 selector: 'app-register-u',
 templateUrl: './register-u.component.html',
 styleUrls: ['./register-u.component.css']
})
export class RegisterUComponent implements OnInit {

 constructor( private router: Router, private authService: AuthService) { }
 public email: string = '';
 public password: string = '';
 public name: string = '';
 public apellido: string = '';
 public Uid: string = '';


 ngOnInit() {
 }

 onAddUser(){
   this.authService.registerUser(this.email, this.password)
   .then((res) =>{
     this.router.navigate(['inicio']);
   }).catch(err => console.log('err', err.message));
 }

}

