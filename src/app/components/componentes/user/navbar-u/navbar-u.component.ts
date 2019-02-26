import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { auth } from "firebase/app";

@Component({
  selector: 'app-navbar-u',
  templateUrl: './navbar-u.component.html',
  styleUrls: ['./navbar-u.component.css']
})
export class NavbarUComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
  }

  onlogout(){
    this.afAuth.auth.signOut();
  }
}
