import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { map } from "rxjs/operators";
import { auth, User } from "firebase/app";
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection} from '@angular/fire/firestore';
import { userInterface } from 'src/app/models/user';
import { Observable } from 'rxjs';





@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userCollection: AngularFirestoreCollection<userInterface>;
  users: Observable<userInterface[]>;
  user: Observable<userInterface>;
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
      active: true,
      roles: {
        admin: true
      }
    }
    return userRef.set(data, { merge: true })
  }


  isUserAdmin(userUid) {
    return this.afs.doc<userInterface>(`users/${userUid}`);
  }

getProfile(user : userInterface){
  const usuario = this.afs.doc<userInterface>(`users/${user.active}`);
  return user.active;
}

/*
signInWithEmailAndPassword(email: string, password: string) {
  return this.afsAuth.auth.signInWithEmailAndPassword(email, password)
    .then((credential) => {
      this.userInterface.getUser(credential.user.uid).subscribe(user => {
        if (user.isActive === true) {
          console.log('activo mano')
          this.userService.setUser(credential.user.uid);
          this.router.navigate(['/home']);
        } else {
          console.log('estas pegao\'')
          this.getOut();
          this.router.navigate(['/userdisabled']);
        }
      })
    })
}
*/

}