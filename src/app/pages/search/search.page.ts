import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { UserService } from 'src/app/services/user.service';
import IRota from 'src/app/models/rota.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  modes = ['date', 'date-time', 'month', 'mont-year','time','time-date', 'year'];
  selecteMode = 'date';
  showPicker = false;
  showPicker2 = false;
  dateValue = format(new Date(), 'yyyy-MM-dd')/* +'T09:00:00;000Z' */;
  dateValue2 = format(new Date(), 'yyyy-MM-dd')/* +'T09:00:00;000Z' */;
  formattedString: string;
  formattedString2: string;
  origem: string;
  destino: string;
  pesquisaOrigem = '';
  pesquisaDestino ='';
  rota: Observable<Array<IRota>> ;
  sugestoes: IRota[] = [];

  isModalOpen = false;

  rotas: Observable<Array<IRota>> ;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }



  constructor(
    private alertController: AlertController,
    private route: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore,
    private UserS:UserService,){}

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
    this.setToday();
    this.route.queryParamMap
      .subscribe((params)=>{

        if(params.get('destino') == null){
          this.search(params.get('cidadeOrigem'),params.get('cidadeDestino'), params.get('dataIda'), params.get('dataVolta'));
        }else{
          this.search(params.get('cidadeOrigem'),params.get('cidadeDestino'), params.get('dataIda'), params.get('dataVolta'));
        }

    });

  };


  search(cidadeOrigem, cidadeDestino, dataIda, dataVolta){
    this.pesquisaOrigem = cidadeOrigem;
    this.pesquisaDestino = cidadeDestino;
    this.formattedString = dataIda;
    this.formattedString2 = dataVolta;


    if (cidadeOrigem == null && dataVolta == null) {

      this.rotas = this.firestore.collection<IRota>('viagem', ref => ref
      .where('destino', '==', cidadeDestino)
      .where('dataIda', '==', dataIda )).valueChanges();
    }else if (cidadeDestino == null && dataVolta == null) {
      this.rotas = this.firestore.collection<IRota>('viagem', ref => ref
      .where('origem', '==',cidadeOrigem)
      .where('dataIda', '==', dataIda )).valueChanges();

    }else if (cidadeDestino == null && dataVolta !== null){
      this.rotas = this.firestore.collection<IRota>('viagem', ref => ref
      .where('origem', '==', cidadeOrigem)
      .where('destino', '==', cidadeDestino)
      .where('dataIda', '==', dataIda)
      .where('dataVolta', '==', dataVolta)).valueChanges();

    }else{
      this.rotas = this.firestore.collection<IRota>('viagem', ref => ref
      .where('origem', '==', cidadeOrigem)
      .where('destino', '==', cidadeDestino)
      .where('dataIda', '==', dataIda)).valueChanges();
  }
}
  pesquisar(){
    console.log('função pesquisar')
    if (this.pesquisaOrigem == null  ) {

      this.rotas = this.firestore.collection<IRota>('viagem', ref => ref
      .where('destino', '==', this.pesquisaDestino)
      .where('dataIda', '==', this.formattedString )).valueChanges();

    }else if (this.pesquisaDestino !== null ) {
      this.rotas = this.firestore.collection<IRota>('viagem', ref => ref
      .where('origem', '==', this.pesquisaOrigem)
      .where('dataIda', '==', this.formattedString )).valueChanges();

    }else{
      this.rotas = this.firestore.collection<IRota>('viagem', ref => ref
      .where('origem', '==', this.pesquisaOrigem)
      .where('destino', '==', this.pesquisaDestino)
      .where('dataIda', '==' , this.formattedString)).valueChanges();
    }

  }

  digitando(origem: any, destino: any){
    this.rota.subscribe(data => {
      this.sugestoes = data.filter(item => item.origem.toLowerCase().includes(origem.toLowerCase()));
      this.sugestoes = data.filter(item => item.destino.toLowerCase().includes(destino.toLowerCase()));

    });
  }


  details(id: string){
    try{
      this.router.navigate(['/details'], {queryParams:{codigo: id}});
    }
    catch(err){
      console.log('Erro',err);
    }

  }


  }

