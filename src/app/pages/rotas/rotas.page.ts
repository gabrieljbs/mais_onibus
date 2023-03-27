import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import IRota from 'src/app/models/rota.model';
import { Observable } from 'rxjs';





@Component({
  selector: 'app-rotas',
  templateUrl: './rotas.page.html',
  styleUrls: ['./rotas.page.scss'],
})



export class RotasPage implements OnInit {

  cod: String ='';
  pesquisaOrigem = '';
  pesquisaDestino ='';
  rotas: Observable<Array<IRota>> ;


  constructor(

  private route: ActivatedRoute,
  private router: Router,
  private firestore: AngularFirestore,

  ) {


  }
  ngOnInit() {

    this.route.queryParamMap
      .subscribe((params)=>{
        this.pesquisaOrigem = params.get("origem");
        this.pesquisaDestino = params.get("cidadeB");
        this.buscar(this.pesquisaOrigem,this.pesquisaDestino);
        console.log(this.pesquisaOrigem,this.pesquisaDestino);
    });

  };

  buscar(cidadeA,cidadeB){
    this.pesquisaOrigem = cidadeA;
    this.pesquisaDestino = cidadeB;
    console.log(this.pesquisaDestino,this.pesquisaOrigem);
    if (this.pesquisaOrigem == null ) {

      this.rotas = this.firestore.collection<IRota>('rota', ref => ref
      .where('destino', '==', this.pesquisaDestino)).valueChanges()

    }else if (this.pesquisaDestino == null ) {
      this.rotas = this.firestore.collection<IRota>('rota', ref => ref
      .where('origem', '==', this.pesquisaOrigem)).valueChanges()

    }else{
      this.rotas = this.firestore.collection<IRota>('rota', ref => ref
      .where('origem', '==', this.pesquisaOrigem)
      .where('destino', '==', this.pesquisaDestino)).valueChanges()
    }
    console.log(this.pesquisaDestino,this.pesquisaOrigem);
  }
  pesquisar(){

    if (this.pesquisaOrigem.length < 1 ) {

      this.rotas = this.firestore.collection<IRota>('rota', ref => ref
      .where('destino', '==', this.pesquisaDestino)).valueChanges()

    }else if (this.pesquisaDestino.length < 1 ) {
      this.rotas = this.firestore.collection<IRota>('rota', ref => ref
      .where('origem', '==', this.pesquisaOrigem)).valueChanges()

    }else{
      this.rotas = this.firestore.collection<IRota>('rota', ref => ref
      .where('origem', '==', this.pesquisaOrigem)
      .where('destino', '==', this.pesquisaDestino)).valueChanges()
    }

  }


  confirma(id: string){

    try{
      this.router.navigate(['/confirmacao'], {queryParams:{codigo: id}})
    }
    catch(err){
      /* console.log('Erro',err) */
    }
  }
}
