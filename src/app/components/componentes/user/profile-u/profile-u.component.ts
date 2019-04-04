import { Component, OnInit } from '@angular/core';
import {userInterface} from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
 selector: 'app-profile-u',
 templateUrl: './profile-u.component.html',
 styleUrls: ['./profile-u.component.css']
})

export class ProfileUComponent implements OnInit {

  constructor(private authService: AuthService) { }
  user: userInterface = {
    dir: '',
    name: 'hola',
    email: '',
    active: 'true',
    roles: {
      admin: 'true'
    }
  };

  public providerId: string = 'null';
  ngOnInit() {
    this.authService.isAuth().subscribe(user => {
      if (user) {
        this.user.name = user.displayName;
        this.user.email = user.email;
        this.providerId = user.providerData[0].providerId;
      }
    })
  }
  updateUser(user: userInterface){
    this.authService.isAuth().subscribe(users => {
      if(users){
        this.user.name = user.name;
      }
    })
  }
}
