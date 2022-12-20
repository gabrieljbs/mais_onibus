import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  nome: string="";
  email: string="";
  password:"";
  confimarPassword:"";
  telefone:'';
  cpf:'';
  ativo:'true';
  

  loading: HTMLIonLoadingElement;
  constructor(
    private router: Router,
    private alertController: AlertController,
    private firestore: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private fireAuth: AngularFireAuth
    
  ) { }

  ngOnInit() {
  }

  async cadastrar(){
    if(this.password != this.confimarPassword){
      const alertPasword = await this.alertController.create({
        header: 'Atenção',
        subHeader: 'Menssagem de Senha',
        message: 'Senhas incompatives',
        buttons: ['OK'],
      });
  
      await alertPasword.present();
      
      
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
          handler: () => {
            console.log('O leso cancelou...')
          }
        },
        {
          text: 'Sim',
          role: 'confirm',
          handler: async () => {
            await this.showLoading();
            if(this.password != this.confimarPassword){

            }
            try{
              const result = await this.fireAuth.createUserWithEmailAndPassword(this.email, this.password);
              console.log(result);
              const uid = result.user.uid;
              this.firestore.collection('usuario').doc(uid).set({email: this.email, nome: this.nome, ativo: true,cpf: this.cpf, id: uid });
              this.router.navigateByUrl('login');
              this.presentToast('<h1>Usuário criado com sucesso. Agora faça o login para acessar o sistema!</h1>');
            }
            catch(deuErro){
              console.log(JSON.stringify(deuErro));
              if(deuErro.code === 'auth/email-already-in-use'){
                this.presentToast('<h1>Este e-mail já está sendo utilizado!</h1>');
              }else if(deuErro.code === 'auth/weak-password'){
                this.presentToast('<h1>Senha fraca. Tente outra senha!</h1');
              }else{ 
                this.presentToast('<h1>Erro desconhecido.</h1>');
              }
              
            }
            await this.fecharLoading();
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
      position: 'bottom'
    });

    await toast.present();
  }

  private async showLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Aguarde...'
    });

    this.loading.present();
  }

  private async fecharLoading(){
    await this.loading.dismiss();
  }


}
