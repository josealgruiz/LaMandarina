import { Component, OnInit } from '@angular/core';
import { userInterface } from "../../../../models/user";
import { AuthService } from "../../../../services/auth.service";

@Component({
  selector: 'app-usuarios-admin',
  templateUrl: './usuarios-admin.component.html',
  styleUrls: ['./usuarios-admin.component.css']
})
export class UsuariosAdminComponent implements OnInit {

  private users: userInterface[];

  constructor(public authService: AuthService) { }


  ngOnInit() {
    this.getListUsers();
  }

  getListUsers(){
    this.authService.getUsers().subscribe(users => {
      this.users = users;
      console.log(users)
    });
  }

  onUpdateUser(event, userInterface){
    this.authService.updateUser(userInterface);
  }

}
