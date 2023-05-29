/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
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

  showModal = false;
  public idaVoltaChecked: boolean = false;

  public data = [
    'Belém',
    'Belo Horizonte',
    'Fortaleza',

  ];
  public results = [...this.data];

  handleInput(event) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(
    private alertController: AlertController,
    private router: Router,
    private firestore: AngularFirestore,

  )
  {this.setToday();}

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
  sugestao(destino: any, origem: any){

    console.log('Origem:' + destino );
    this.rota.subscribe(data => {
      console.log('Data:', data);
      const sugestoes = data.map(item => [item.destino, item.origem]);
      console.log('Data2:', sugestoes[0]);
    });
  }




  viewPromotin(cidade){
    try{
      this.router.navigate(['/search'], {queryParams:{cidadeDestino:cidade, dataIda:this.formattedString}});
    }
    catch(err){
      console.log('Erro',err);
    }

  }

  search(origem, destino, formattedString, formattedString2){
    try{

      this.router.navigate(['/search'], {
        queryParams:{cidadeOrigem:origem, cidadeDestino:destino, dataIda:formattedString, dataVolta:formattedString2 }});

    }
    catch(err){
      console.log('Erro',err);
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
