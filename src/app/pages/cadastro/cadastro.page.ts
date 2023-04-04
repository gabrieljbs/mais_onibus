import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Register } from '../../models/register';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  public user: Register;
  private loading;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private userService: UserService

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

  async cadastrar(){
    if(this.user.password !== this.user.confPassword){
      this.alertController.create({
        header: 'Atenção',
        subHeader: 'Menssagem de Senha',
        message: 'Senhas incompatives',
        buttons: ['OK'],
      });
    }else{
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Confirme os dados',
      message: 'Leia seus dados atentamente e confirme: se seus dados estão corretos?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
        },
        {
          text: 'Sim',
          role: 'confirm',
          handler: async () => {
            try{
              await this.showLoading();
              const result = await this.userService.register(this.user);
              this.router.navigateByUrl('login');//Mandar para home após registro
              this.presentToast('<p>Usuário criado com sucesso. Agora faça o login para acessar o sistema!</p>');
            }
            catch(error){
              console.log(JSON.stringify(error));
              if(error.code === 'auth/email-already-in-use'){
                this.presentToast('<p>Este e-mail já está sendo utilizado!</p>');
              }else if(error.code === 'auth/weak-password'){
                this.presentToast('<p>Senha fraca. Tente outra senha!</p');
              }else{
                this.presentToast('<p>Erro desconhecido.</p>');
              }
            }
            this.loading.dismiss();
          }
        },
      ],

    });

    await alert.present();
  }
  async presentToast( mensagem: string ) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      position: 'middle'
    });

    await toast.present();
  }

  private async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Aguarde...'
    });

    this.loading.present();
  }

}
