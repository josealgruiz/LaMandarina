import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

/* FIREBASE */
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarUComponent } from './components/componentes/user/navbar-u/navbar-u.component';
import { LoginUComponent } from './components/componentes/user/login-u/login-u.component';
import { RegisterUComponent } from './components/componentes/user/register-u/register-u.component';
import { LostaccountUComponent } from './components/componentes/user/lostaccount-u/lostaccount-u.component';
import { ProfileUComponent } from './components/componentes/user/profile-u/profile-u.component';
import { NavbarAComponent } from './components/componentes/admin/navbar-a/navbar-a.component';
import { ProductsComponent } from './components/componentes/productos/products/products.component';
import { ProductsformComponent } from './components/componentes/productos/productsform/productsform.component';
import { VistaprodComponent } from './components/componentes/productos/vistaprod/vistaprod.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarUComponent,
    LoginUComponent,
    RegisterUComponent,
    LostaccountUComponent,
    ProfileUComponent,
    NavbarAComponent,
    ProductsComponent,
    ProductsformComponent,
    VistaprodComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
