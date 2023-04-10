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
    console.log('função entrar sendo chamada');
    try{
      const req = await this.loginServices.login(this.user,);
      this.router.navigateByUrl('home');
    }
    catch(error){
      console.log(JSON.stringify(error));
      if(error.code === 'auth/email-already-in-use'){
        this.presentToast('Este e-mail já está sendo utilizado!');
      }else if(error.code === 'auth/weak-password'){
        this.presentToast('Senha Errada.');
      }else{
        this.presentToast('Erro desconhecido.');
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

}
