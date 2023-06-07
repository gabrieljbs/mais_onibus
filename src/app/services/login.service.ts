import { Injectable } from '@angular/core';
import { AngularFireAuth,  } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Register } from '../models/register';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private auth: AngularFireAuth

    ) {}

    async login(registerUser: Register){

     const res = await this.auth.signInWithEmailAndPassword(registerUser.email,registerUser.password );



    }

    async logOut() {
      const res = await this.auth.signOut();

    }
}
