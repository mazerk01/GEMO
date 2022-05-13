import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
import { Tabacchi } from "./tabacchi.model";

@Injectable({providedIn: 'root'})
export class NotificheService {
  prodAttivo: Partial<Tabacchi> = {};
  barcodeAttivo: string = '';

  getDescrizione() {
    return this.prodAttivo.descrizione;
  }

  getBarcode() {
    return this.barcodeAttivo;
  }
}
