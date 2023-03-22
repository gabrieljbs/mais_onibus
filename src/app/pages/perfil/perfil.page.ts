import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  public jogador = {
    nome: "Gabriel",
    hab: 6,
    stamina: 24
  };

  public adversario = {
    nome: "Bixaaaa",
    hab: 6,
    stamina: 24
  };
  
  constructor(private alertController: AlertController) { }

  ngOnInit(
    max=7,
    min=1
  ) {

    const dadoJ = Math.floor(Math.random() * (max - min) + min)
    const dadoA = Math.floor(Math.random() * (max - min) + min)

    console.log(dadoJ, dadoA);

    this.jogador.hab = this.jogador.hab + dadoJ;
    this.adversario.hab = this.adversario.hab + dadoA;


    for (let index = 0; index < 2; index++) { 
       this.jogador.stamina = this.jogador.stamina + Math.floor(Math.random() * (max - min) + min)
       this.adversario.stamina = this.adversario.stamina + Math.floor(Math.random() * (max - min) + min)
    }


  }
  
  async jogar(max=7,min=1, pontoA:number, pontoJ:number){
   
    const dadoJ = Math.floor(Math.random() * (max - min) + min);
    const dadoA = Math.floor(Math.random() * (max - min) + min);

    pontoA = this.adversario.hab + dadoA;
    pontoJ = this.jogador.hab + dadoJ;

    if(pontoA < pontoJ){
      this.adversario.stamina = this.adversario.stamina - 2
    }if (pontoA > pontoJ) {
      this.jogador.stamina = this.jogador.stamina - 2
    } else {
      this.jogador.stamina = this.jogador.stamina - 1
      this.adversario.stamina = this.adversario.stamina - 1
    }


    console.log("pontos do Adversario: "+pontoA, "pontos do jogador: "+pontoJ)

    if(this.jogador.stamina <= 0){
      const alert = await this.alertController.create({
        header: 'Game Over',
        subHeader: 'Você perdeu',
        message: 'tente de novo OTARIO, CLICK QUE SE VOCÊ É    UMA BIXINHA',
        buttons: ['OK'],
        
        });
        await alert.present();


    }if (this.adversario.stamina <= 0){ 
      const alert1 = await this.alertController.create({
        header: 'Game Over',
        subHeader: 'Você ganhou',
        message: 'Parabens!',
        buttons: ['OK'],
        });
        await alert1.present();
    } else {
      
    }
      

  }

}