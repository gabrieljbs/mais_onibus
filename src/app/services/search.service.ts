import { Injectable } from '@angular/core';
import { Search } from '../models/search';
import IRota from 'src/app/models/rota.model';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  rotas: Observable<Array<IRota>>

  constructor(
    private firestore: AngularFirestore

  ) { }


buscar(search:Search){
 /* 
 this.dataIda = search.dataIda;
 this.dataVolta = search.dataVolta;
 */
 if (search.origem == null ) {
   
   this.rotas = this.firestore.collection<IRota>('rota', ref => ref
   .where('destino', '==', search.destino)).valueChanges()
   
 }else if (search.destino == null ) {
   this.rotas = this.firestore.collection<IRota>('rota', ref => ref
   .where('origem', '==', search.origem)).valueChanges()

 }else{
   this.rotas = this.firestore.collection<IRota>('rota', ref => ref
   .where('origem', '==', search.origem)
   .where('destino', '==', search.destino)).valueChanges()
 }

}

ler(){
  console.log("Origem: "+" Destino: "+" Data de Ida: "+" Data de Volta: "+"")
}

}
