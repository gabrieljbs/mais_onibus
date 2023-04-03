import { Component, OnInit } from '@angular/core';
import IRota from 'src/app/models/rota.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  rota: IRota;  
  constructor(
    private firestore: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
  ) { }

  ngOnInit() {

    this.route.queryParamMap
      .subscribe((params)=>{
        let codigo =  params.get("codigo"); 
        this.firestore.collection <IRota> ('viagem', ref => ref.where('id', '==', codigo))
        .valueChanges()
        .subscribe(dados =>{
          this.rota = dados[0];
          
        })
        console.log(codigo);
    });

  }

}
