import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { auth } from "firebase/app";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { userInterface } from "../models/user";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  idUser: string;
  userCollection: AngularFirestoreCollection<userInterface>;
  users: Observable<userInterface[]>;
  userDoc: AngularFirestoreDocument<userInterface>; 
  constructor(private afsAuth: AngularFireAuth, private afs: AngularFirestore, public db: AngularFirestore) { 
    this.userCollection = this.db.collection('users');
    this.users = this.userCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as userInterface;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  isActive(user: userInterface){
    this.userDoc = this.db.doc(`users/${user.enable}`);
    return this.userDoc;
  }

  registerUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
        .then(userData => {
          resolve(userData),
            this.updateUserData(userData.user)
        }).catch(err => console.log(reject(err)))
    });
  }

  loginEmailUser(email: string, pass: string) {
    return new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
        .then(userData => resolve(userData),
        err => reject(err));
    });
  }

  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then(credential => this.updateUserData(credential.user))
  }

  logoutUser(){
    return this.afsAuth.auth.signOut();
  }

  isAuth() {
    return this.afsAuth.authState.pipe(map(auth => auth));
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: userInterface = {
      id: user.uid,
      email: user.email,
      active: 'true',
      roles: {
        admin: 'true'
      }
    }
    return userRef.set(data, { merge: true })
  }
  getOneAdmin( idUser: string){
    this.userDoc= this.afs.doc<userInterface>(`users/${idUser}`);
    return this.userDoc.snapshotChanges()
    .pipe(map(action=>{action.payload.data()
      console.log(action.payload.data())
        const data = action.payload.data() as userInterface;
        return data.roles.admin;
    }));
  }

  getUsers(){
      return this.users = this.userCollection.snapshotChanges()
      .pipe(map( changes => {
       return changes.map(action => {
         const data = action.payload.doc.data() as userInterface;
         data.id = action.payload.doc.id;
         return data;
       }) ;
      }));
    }
  
    updateUser(user: userInterface): void{
      let idUser = user.id;
      this.userDoc = this.db.doc(`users/${idUser}`);
      this.userDoc.update(user);
  
    }


    getOneActivo( idUser: string){
      this.userDoc= this.afs.doc<userInterface>(`users/${idUser}`);
      return this.userDoc.snapshotChanges()
      .pipe(map(action=>{action.payload.data()
        console.log(action.payload.data())
          const data = action.payload.data() as userInterface;
          return data.active;
      }));
    }

    getOneinhabilitado( idUser: string){
      this.userDoc= this.afs.doc<userInterface>(`users/${idUser}`);
      return this.userDoc.snapshotChanges()
      .pipe(map(action=>{action.payload.data()
        console.log(action.payload.data())
          const data = action.payload.data() as userInterface;
          console.log(data);
          
          return data.active;

      }));
    }
}