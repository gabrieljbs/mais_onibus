import { Time } from "@angular/common";

export default interface IRota{
    id: string;
    empresa: string;
    datetime:string;
    desc:string;
    destino:string;
    origem:string;
    placa: string;
    img: string;
    dataI:string;
    dataV:string;
    preco: number;
    qnt_passageiro:number;
    status:string;
}