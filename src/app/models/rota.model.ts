import { Time } from "@angular/common";

export default interface IRota{
    id: string;
    empresa: string;
    hora: string;
    desc: string;
    destino: string;
    origem: string;
    placa: string;
    img: string;
    dataIda: string;
    dataVolta: string;
    preco: string;
    status: string;
}
