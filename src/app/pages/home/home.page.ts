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


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }



  constructor(
    private alertController: AlertController,
    private router: Router,
    private UserS:UserService,
    private firestore: AngularFirestore,
  )
  {
   this.setToday();
  }

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
    this.UserS
    
    this.promocao = this.firestore.collection<IPromocao>('promocao').valueChanges()

    this.rota = this.firestore.collection<IRota>('viagem').valueChanges();
    
  }
  digitando(sugestao:any){
    this.origem = sugestao.origem;
    this.destino = sugestao.destino;
  }

 
  /* digitando(valor:string){
    this.origem = valor
    this.rota.subscribe(data => {
      // Filtrar a lista de sugestões com base no texto digitado pelo usuário
      const sugestoes = data.filter(item => item.origem.toLowerCase().includes(valor.toLowerCase()));
      if (sugestoes.length > 0) {
        // Definir a primeira sugestão como valor da barra de pesquisa
        this.origem = sugestoes[0].origem;
        this.destino = sugestoes[0].destino;
      } else {
        // Se não houver sugestões, limpar os campos de pesquisa
        this.destino = '';
      }
    });
  } */

  
  pesquisar(origem: string,destino: string, formattedString, formattedString2){
    try{

      this.router.navigate(['/search'], {queryParams:{cidadeA: origem, cidadeB: destino, dataI:formattedString , dataV:formattedString2 }})

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
