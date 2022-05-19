import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Barcode } from "./barcode.model";
import { NotificheService } from "./notifiche.service";
import { Tabacchi } from "./tabacchi.model";
import { Reparti } from "./reparti.model";
import { Gev } from "./gev.model";
import { IVE } from "./iva.model";

@Injectable({providedIn: 'root'})
export class FiltriService {
  tabacchi: Tabacchi[] = [];
  GEV: Gev[] = [];
  barcodes: Barcode[] = [];
  barcodesFiltrati: Barcode[] = [];
  cercaTabacchi: Tabacchi[] = [];
  cercaGEV: Gev[] = [];
  cercaReparto: string = 'All';
  zeroBarcodes: boolean = false;
  ricercaAttiva: string = '';
  addBcodeAttiva: boolean = false;
  editBcodeAttiva: boolean = false;
  delBcodeAttiva: boolean = false;

  // Operazioni sui barcodes
  barcodeDaEliminare: string = '';

  // Prodotto attivo
  tabacchiAttivo: Partial<Tabacchi> = {};
  GEVAttivo: Partial<Gev> = {};

  // Reparti
  repartiTabacchi: Reparti[] = [];
  repartiGEV: Reparti[] = [];

  // IVE
  iveTabacchi: IVE[] = [];
  iveGEV: IVE[] = [];

  // GETta la lista di tutti i tabacchi
  getTabacchi() {
    const url = 'https://gabservizi.it/api-tabacchi/api/tabacchi';
    this.httpClient.get<Tabacchi[]>(url).subscribe(data => {
      this.tabacchi = data;
      this.cercaTabacchi = this.tabacchi.sort(function (a,b) {
        return <any>new Date(a.dataModifica) - <any>new Date(b.dataModifica);
      }).reverse();

      // Filtra risultati anche dopo aver effettuato operazioni che triggerano ngOnInit
      if (this.ricercaAttiva !== '') {
        this.searchProdotto(this.ricercaAttiva);
      }
    });
  }

  // GETta la lista di tutti i gratta & vinci
  getGEV() {
    const url = 'https://gabservizi.it/api-tabacchi/api/gev';

    this.httpClient.get<Gev[]>(url).subscribe(data => {
      this.GEV = data;
      this.cercaGEV = this.GEV.sort(function (a,b) {
        return <any>new Date(a.dataModifica) - <any>new Date(b.dataModifica);
      }).reverse();

      // Filtra risultati anche dopo aver effettuato operazioni che triggerano ngOnInit
      if (this.ricercaAttiva !== '') {
        this.searchProdotto(this.ricercaAttiva);
      }
    });
  }

  // GETta tutti i Barcodes
  getBarcodes() {
    const url = 'https://gabservizi.it/api-tabacchi/api/tabacchi/barcode';
    this.httpClient.get<Barcode[]>(url).subscribe(data => this.barcodes = data);

    this.associaBarcodes();
  }

  getTabacchiSingoli(prod: Partial<Tabacchi>) {
    const url = `https://gabservizi.it/api-tabacchi/api/tabacchi/${prod.codice}`;
    this.httpClient.get<Tabacchi>(url).subscribe(data => this.tabacchiAttivo = data)
  }

  // per prendere i barcode associati al codice del prodotto
  getBarcodeTabacchi(codice: string) {
    const url = `https://gabservizi.it/api-tabacchi/api/tabacchi/barcode?codiceArticolo=${codice}`;
    this.httpClient.get<Barcode[]>(url).subscribe(data => {
      this.barcodesFiltrati = data;
      if (this.barcodesFiltrati.length == 0)
        this.zeroBarcodes = true;
      else
        this.zeroBarcodes = false;
    });
  }

  getRepartiTabacchi() {
    const url = `https://gabservizi.it/api-tabacchi/api/tabacchi/reparti`;
    this.httpClient.get<Reparti[]>(url).subscribe(data => this.repartiTabacchi = data);
  }

  getRepartiGEV() {
    const url = `https://gabservizi.it/api-tabacchi/api/gev/reparti`;
    this.httpClient.get<Reparti[]>(url).subscribe(data => this.repartiGEV = data);
  }

  // per popolare dinamicamente i campi IVA dei tabacchi
  getIveTabacchi() {
    const url = `https://gabservizi.it/api-tabacchi/api/tabacchi/ive`;
    this.httpClient.get<IVE[]>(url).subscribe(data => this.iveTabacchi = data);
  }

  // per popolare dinamicamente i campi IVA dei G&V
  getIveGEV() {
    const url = `https://gabservizi.it/api-tabacchi/api/gev/ive`;
    this.httpClient.get<IVE[]>(url).subscribe(data => this.iveGEV = data);
  }

  // Per switchare la categoria tra Tabacchi o G&V
  mostraGEV: boolean = false;

  switchCategoria() {
    this.mostraGEV = !this.mostraGEV;
    this.cercaReparto = 'All';
  }

  settaTutti() {
    this.cercaReparto = 'All';
    this.searchProdotto(this.ricercaAttiva);
  }

  settaReparto(rep: any) {
      this.cercaReparto = rep.codice;
      this.searchProdotto(this.ricercaAttiva);
  }

  // Ricerca prodotti inseriti dall'utente
  searchProdotto(prod: string) {
    this.ricercaAttiva = prod;

    if (!this.mostraGEV) {
      if (this.cercaReparto == 'All') {
        this.cercaTabacchi = this.tabacchi.filter( element => element.descrizione.toLowerCase().includes(prod.toLowerCase()) )
      } else {
        if (prod !== '') {
          this.cercaTabacchi = this.tabacchi.filter( element => element.descrizione.toLowerCase().includes(prod.toLowerCase()) && element.codiceReparto == this.cercaReparto )
        } else {
          this.cercaTabacchi = this.tabacchi.filter(element => element.codiceReparto == this.cercaReparto)
        }
      }
    } else {
      if (this.cercaReparto == 'All') {
        this.cercaGEV = this.GEV.filter( element => element.descrizione.toLowerCase().includes(prod.toLowerCase()) )
      } else {
        if (prod !== '') {
          this.cercaGEV = this.GEV.filter( element => element.descrizione.toLowerCase().includes(prod.toLowerCase()) && element.codiceReparto == this.cercaReparto )
        } else {
          this.cercaGEV = this.GEV.filter(element => element.codiceReparto == this.cercaReparto)
        }
      }
    }
  }

  annullaEditBcode() {
    this.editBcodeAttiva = false;
  }

  delBarcode(bc: string) {
    const url = `https://gabservizi.it/api-tabacchi/api/tabacchi/barcode/${bc}`;

    const httpOptions = {
      body: {
        "barcode" : bc
      }
    };

    this.notificheService.barcodeAttivo = bc;
    this.httpClient.delete(url, httpOptions).subscribe( (b) => this.barcodesFiltrati = this.barcodesFiltrati.filter( item => {
      item.codiceBarcode != bc;
      this.delBcodeAttiva = false;
      this.getBarcodeTabacchi(this.tabacchiAttivo.codice as string);
      this.editBcodeAttiva = false;
    }) );
  }

  confermaDelete() {
    this.delBcodeAttiva = true;
  }

  annullaDelete() {
    this.delBcodeAttiva = false;
  }

  // per la modal
  attivaView: string = 'articolo';

  // Actually sono per settare la view della modal, non il footer
  settaFooterBarcode() { this.attivaView = 'barcode'; }

  settaFooterArticolo() { this.attivaView = 'articolo'; }

  settaFooterCancella() { this.attivaView = 'cancella'; }

  // Badges per la decorrenza del prezzo
  dataAttuale = new Date();

  giorniDecorrenza(prodotto: Partial<Tabacchi>) {
    const dataDecorr = new Date(prodotto.dataDecorrenzaModifica as string);
    let differenza = Math.floor((Date.UTC(dataDecorr.getFullYear(), dataDecorr.getMonth(), dataDecorr.getDate()) - Date.UTC(this.dataAttuale.getFullYear(), this.dataAttuale.getMonth(), this.dataAttuale.getDate()) ) /(1000 * 3600 * 24));
    prodotto.giorniDecorrenza = differenza;

    return prodotto.giorniDecorrenza;
  }

  // Per consentire la ricerca per barcodes che mostra il prodotto
  arrAssociati: Tabacchi[] = [];

  associaBarcodes() {
    const arrBarcodes = this.barcodes;
    this.arrAssociati = this.tabacchi;

    const result = this.arrAssociati.map(p => {
      return Object.assign(p, arrBarcodes.filter( b => b.codiceArticolo == p.codice));
    })
  }

  // ------------------------------------------------------------- MOBILE ----------------------------------------------------------

  // Reparti
  attivaModalReparti: boolean = false;

  settaModalReparti() { this.attivaModalReparti = true; }

  chiudiModalReparti() { this.attivaModalReparti = false; }

  // Conferma delete
  mobileDelete: boolean = false;

  settaDeleteMobile() {
    this.mobileDelete = !this.mobileDelete;
  }

  constructor(public toastr: ToastrService, private httpClient: HttpClient, public notificheService: NotificheService) {}

}
