import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { UserService } from 'src/app/services/user.service';
import { Search } from '../../models/search';
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
  formattedString='';
  formattedString2='';
  
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
    private UserS:UserService,
    
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

    this.route.queryParamMap
      .subscribe((params)=>{
        let cidadeA = params.get("cidadeA"); 
        let cidadeB = params.get("cidadeB");
        let dataI = params.get("dataI"); 
        let dataV = params.get("dataV");
        /* this.buscar(cidadeA,cidadeB); */
        console.log(cidadeA,cidadeB,dataI,dataV);
        

    });

    this.rotas = this.firestore.collection<IRota>('viagem').valueChanges()

  }

  
  

  }
  
