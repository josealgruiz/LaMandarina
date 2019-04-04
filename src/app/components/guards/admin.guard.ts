import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import {take, map, tap} from 'rxjs/operators';
import { userInterface } from'src/app/models/user';

@Injectable({
 providedIn: 'root'
})
export class AdminGuard implements CanActivate {
constructor(private afsAuth: AngularFireAuth, private router: Router, private userInterface: userInterface) {}

 canActivate(
   next: ActivatedRouteSnapshot,
   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  
       return this.afsAuth.authState
       .pipe(take(1))
       .pipe(map(authState => !!authState))
       .pipe(tap(auth => {
<<<<<<< HEAD
         if (true) {
=======
         if (!auth && this.userInterface.roles.admin == 'true') {
>>>>>>> c514b5d02f6356b90ff7f3a6ac0ad512c5eb0ac6
           this.router.navigate(['admin']);
         }
       }));
   }
 }

