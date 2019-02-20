import { Component, OnInit } from '@angular/core';
import { User } from './user';

@Component({
  selector: 'app-login-u',
  templateUrl: './login-u.component.html',
  styleUrls: ['./login-u.component.css']
})
export class LoginUComponent implements OnInit {

  public user = {} as User;
  public name: string;
  public pass: string;

  constructor() { }

  ngOnInit() {
  }

  validarUser(){
    console.log(this.user.username);
  }



}
