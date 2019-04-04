import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { take, map, tap } from 'rxjs/operators';
import { AuthService } from "src/app/services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthLoginGuard implements CanActivate {
  constructor(private afsAuth: AngularFireAuth, private router: Router, private authService: AuthService, private inhabilitado:  AuthService) { }

  public isInhabilitado: any;

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  
        return this.afsAuth.authState
          .pipe(take(1))
          .pipe(map(authState => !!authState))
          .pipe(tap(auth => {
            console.log(auth);
            if (auth) { //si estas log 
              this.authService.isAuth().subscribe( auth => {
                this.inhabilitado.getOneActivo(auth.uid).subscribe(data=>{
                  this.isInhabilitado=data;
                  if(data=='true'){ //Si esta baneado
                    this.router.navigate(['bienvenida']);//mandalo a la bienbenida
                  }
                })
              });
            }
          }));
      }
}

 