import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import IRota from 'src/app/models/rota.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.page.html',
  styleUrls: ['./confirmacao.page.scss'],
})
export class ConfirmacaoPage implements OnInit {
  rota: IRota;  

  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private fireAuth: AngularFireAuth
  ) { 

   
    
  }

  ngOnInit() {

    this.route.queryParamMap
      .subscribe((params)=>{
        let codigo =  params.get("codigo"); 
        this.firestore.collection <IRota> ('rota', ref => ref.where('id', '==', codigo))
        .valueChanges()
        .subscribe(dados =>{
          this.rota = dados[0];
          
        })
        console.log(codigo);
    });
  }
  
  async confirma() {
    this.firestore.collection('viagem_rotas').doc().set({fk_rota: this.rota.id, status:"Em andamento"})
    const alertPasword = await this.alertController.create({
      header: 'Aviso',
      subHeader: 'Menssagem de Confirmação',
      message: 'Viagem agendada',
      buttons: ['OK'],
    });

    
    await alertPasword.present();
    this.router.navigate(['/viagens']);

  }

}
