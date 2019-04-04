import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map, tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
}) 
export class AuthGuard implements CanActivate {
 
  constructor(private afsAuth: AngularFireAuth,
     private router: Router, 
     private admin: AuthService,
     private inhabilitado: AuthService,
     private authService: AuthService,) { }

     public isInhabilitado: any;
     canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  
      return this.afsAuth.authState
        .pipe(take(1))
        .pipe(map(authState => !!authState))
        .pipe(tap(auth => {
          console.log(auth);
          if (!auth) { //si no estas log 
            console.log(auth);
            this.router.navigate(['bienvenida']);
          }
          else{ // si esta log
            this.authService.isAuth().subscribe( auth => {
              this.inhabilitado.getOneinhabilitado(auth.uid).subscribe(data=>{
                this.isInhabilitado=data;

                if(data=='true'){ //Si esta baneado
                  this.router.navigate(['inicio']);//mandalo a la bienbenida
                }
              })
            });
          }
        }));
    }
  }