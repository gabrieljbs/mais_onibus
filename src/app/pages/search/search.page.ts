import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],

  
})
export class SearchPage implements OnInit {
  modes = ['date', 'date-time', 'month', 'mont-year','time','time-date', 'year'];
  selecteMode = 'date';
  showPicker = false;
  dateValue = format(new Date(), 'yyyy-MM-dd')/* +'T09:00:00;000Z' */; 
  formattedString="";
  isModalOpen = false;
  origem: string;
  destino: string;
   

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
   
  

  constructor(
    private alertController: AlertController,
    private router: Router,
    private UserS:UserService 
  ) 
  { 
   this.setToday(); 
  }

  setToday(){
    this.formattedString =  format(parseISO(format(new Date(),'yyyy-MM-dd')/* +'T09:00:00.000Z' */),"d MMM, yyyy")
  }

  dateChanged(value){
    
    this.dateValue = value;
    this.formattedString = format(parseISO(value),"d MMM, yyyy")
    this.showPicker = false;
    console.log(this.formattedString)
    
  }

  ngOnInit() {
    this.UserS
  }

  

  pesquisar(origem: string,destino: string){
    try{
     
      this.router.navigate(['/rotas'], {queryParams:{cidadeA: origem, cidadeB: destino}})
      
    }
    catch(err){
      console.log('Erro',err)
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