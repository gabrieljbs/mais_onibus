import { Component, OnInit } from '@angular/core';
import IViagem from  'src/app/models/viagem_rota.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-viagens',
  templateUrl: './viagens.page.html',
  styleUrls: ['./viagens.page.scss'],
})
export class ViagensPage implements OnInit {
  
  viagem: Observable<Array<IViagem>>

  constructor(
    
    private firestore: AngularFirestore,
    private alertController: AlertController,

    
  ) { }

  ngOnInit() {
    
    this.buscar()
    

  }

  buscar(){
    console.log("Buscando...")
    this.viagem = this.firestore.collection<IViagem>('viagem_rotas', ref => ref.where("status", '==', "Em andamento")).valueChanges()

    
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
