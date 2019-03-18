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
          if (!auth && this.userInterface.roles.admin == true) {
            this.router.navigate(['admin']);
          }
        }));
    }
  }
 