import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import IUsuario from 'src/app/models/usuario.model';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  email: string='';
  password:'';
  private usuario: Observable<Array<IUsuario>>

  constructor(
    
    private router: Router,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private fireAuth: AngularFireAuth
  ) { }

  ngOnInit() {
  }

  async entrar(){

    try{
      const result = await this.fireAuth.signInWithEmailAndPassword(this.email, this.password)
      console.log(result)
      this.presentToast('Bem vindo');
      const logando = await this.online()
      
      
    }
    catch(err){
      console.log(err)
      this.presentToast('Usuario ou senha incorreto')
    }

  }

  async presentToast( mensagem: string ) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      position: 'top'
    });
    await toast.present();
  }

  private async online (){

    try{
      this.router.navigate(['/hender'], {queryParams:{online: this.email}})   
      this.router.navigateByUrl('home')   


    }
    catch(err){
      err}

  }

  
  
}
