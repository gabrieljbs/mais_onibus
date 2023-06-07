/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PerfilPage } from 'src/app/pages/perfil/perfil.page';
import { Router,ActivatedRoute } from '@angular/router';
import IUsuario from 'src/app/models/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';
import {LocationStrategy} from '@angular/common';
import { LoginService } from 'src/app/services/login.service';
/* import { Register } from 'src/app/models/register'; */

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  showButtons = true;
  usuario: IUsuario;
  login: boolean ;
  email: string;
  nome: string='Gabriel Santos';
  img: string='data:image/png;base64,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';


  constructor(
  /*   public user: Register, */
    private url: LocationStrategy,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private UserS: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    private alertController: AlertController,
    private loginServices: LoginService

  ) {
    /* this.user = {
      email: '',
      password: '',
      confPassword: '',
      cpf: '',
      nome: '',
      dataNasc: '',
      telefone: '',
    }; */
    console.log(this.showButtons);
    if (this.url.path() === '/login' || this.url.path() === '/cadastro') {

      this.showButtons = false;
    }else{
      this.showButtons = true;
    }
    console.log(this.showButtons);
    console.log(this.url.path());



}

  ngOnInit() {

    this.route.queryParamMap
    .subscribe((params)=>{
      let online =  params.get("online");
      this.firestore.collection <IUsuario> ('usuario', ref => ref.where("usuario","==", online))
      .valueChanges()
      .subscribe(dados =>{
        this.usuario = dados[0];

      });
      /* console.log(online);
      this.router.navigateByUrl('home') */
  });
  }

  async sair(){

    try {
      const req = await this.loginServices.logOut();
      this.router.navigateByUrl('login');
    } catch (error) {
      alert('Erro:'+ error);
    }
  }

  perfil(){

    try{
      this.router.navigate(['/perfil']);

    }catch(err){
      console.log(err);
    }

  }
 async alert(){
   const alert = await this.alertController.create({
      header: 'Aviso',
      subHeader: 'Menssagem do Sistema',
      message: 'Função não implementada',
      buttons: ['OK'],




    });

    await alert.present();
  }

}
