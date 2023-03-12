import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Register } from '../models/register';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private uid;
  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore
  ) {}

  async register(registerUser: Register) {

    const res = await this.afa.createUserWithEmailAndPassword(registerUser.email, registerUser.password);
    delete registerUser.password;
    this.uid = (await (this.afa.currentUser)).uid;
    await this.afs.doc(`usuario/${this.uid}`).set(registerUser);
  }

}
