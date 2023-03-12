import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { LoadingController, ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import IUsuario from 'src/app/models/user';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { Register } from '../../models/register';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public user: Register;

  constructor(

    private router: Router,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private fireAuth: AngularFireAuth,
    private loginServices: LoginService

  ) {

    this.user = {
      email: '',
      password: '',
      confPassword: '',
      cpf: '',
      nome: '',
      dataNasc: '',
      telefone: '',
    };
   }

  ngOnInit() {
  }

  async entrar(){

    try{
      const req = await this.loginServices.login(this.user,);
      this.router.navigateByUrl('home');
    }
    catch(error){
      console.log(JSON.stringify(error));
      if(error.code === 'auth/email-already-in-use'){
        this.presentToast('<h1>Este e-mail já está sendo utilizado!</h1>');
      }else if(error.code === 'auth/weak-password'){
        this.presentToast('<h1>Senha Errada.');
      }else{
        this.presentToast('<h1>Erro desconhecido.</h1>');
      }
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

  /* private async online (){

    try{
      this.router.navigate(['/hender'], {queryParams:{online: this.email}})
      this.router.navigateByUrl('home');


    }
    catch(err){
      console.log('err');
    }

  }

 */

}
