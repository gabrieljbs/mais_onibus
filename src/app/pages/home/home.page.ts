import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonDatetime, LoadingController, ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { UserService } from 'src/app/services/user.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import  IPromocao  from 'src/app/models/promocao';
import  IRota  from 'src/app/models/rota.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  modes = ['date', 'date-time', 'month', 'mont-year','time','time-date', 'year'];
  selecteMode = 'date';
  showPicker = false;
  showPicker2 = false;
  dateValue = format(new Date(), 'yyyy-MM-dd')/* +'T09:00:00;000Z' */;
  dateValue2 = format(new Date(), 'yyyy-MM-dd')/* +'T09:00:00;000Z' */;
  formattedString='';
  formattedString2='';

  isModalOpen = false;
  origem: string;
  destino: string;
  promocao: Observable<Array<IPromocao>> ;
  rota: Observable<Array<IRota>> ;
  sugestoes: IRota[] = [];


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }



  constructor(
    private alertController: AlertController,
    private router: Router,
    private UserS:UserService,
    private firestore: AngularFirestore,
  )
  {this.setToday()}

  setToday(){
    this.formattedString = format(parseISO(format(new Date(),'yyyy-MM-dd')/* +'T09:00:00.000Z' */),'d MMM, yyyy');
    this.formattedString2 = format(parseISO(format(new Date(),'yyyy-MM-dd')/* +'T09:00:00.000Z' */),'d MMM, yyyy');
  }

  dateChanged(value){
    this.dateValue = value;
    this.formattedString = format(parseISO(value),'d MMM, yyyy');
    this.showPicker = false;
    console.log(this.formattedString);
  }

  dateChanged2(value2){
    this.dateValue2 = value2;
    this.formattedString2 = format(parseISO(value2),'d MMM, yyyy');
    this.showPicker2 = false;
    console.log(this.formattedString2);

  }

  ngOnInit() {


    this.promocao = this.firestore.collection<IPromocao>('promocao').valueChanges();

    this.rota = this.firestore.collection<IRota>('viagem').valueChanges();

  }

  digitando(origem: any, destino: any){
    this.rota.subscribe(data => {
      this.sugestoes = data.filter(item => item.origem.toLowerCase().includes(origem.toLowerCase()));
      this.sugestoes = data.filter(item => item.destino.toLowerCase().includes(destino.toLowerCase()));

    });
  }


  pesquisar(origem, destino, formattedString, formattedString2){
    try{

      this.router.navigate(['/search'], {queryParams:{cidadeA:origem, cidadeB:destino, dataI:formattedString , dataV:formattedString2 }});

    }
    catch(err){
      console.log('Erro',err);
    }

  }

  confirma(){}
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
