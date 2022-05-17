import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { Barcode } from 'src/app/core/barcode.model';
import { FiltriService } from 'src/app/core/filtri.service';
import { Gev } from 'src/app/core/gev.model';
import { NotificheService } from 'src/app/core/notifiche.service';
import { Tabacchi } from 'src/app/core/tabacchi.model';

@Component({
  selector: 'app-home',
  template: `
  <div class="alert alert-danger mt-5 border-dark" role="alert" id="loginCheck" style="text-align: center; font-size: 2rem; width: 80%; margin: 0 auto 0 auto;" *ngIf="!authService.isAuth()">
    ACCESSO NON AUTORIZZATO
    <br>
    <button class="btn btn-danger" routerLink="" style="width: 28em;"> Portami alla pagina di Login </button>
  </div>

  <div>
    <app-modal-edit
      [insNuovo]="insNuovo"
      [editBcode0]="editBcode0"
      [editPezzi0]="editPezzi0"
      (editBarcodes)="editBarcodes($event)"
      (settaEditBcode)="settaEditBcode($event)"
      (closeEditPopup)="closeEditPopup()"
      (editProdotto)="editProdotto($event)"
      (addBarcode)="addBarcode($event)"
      (cancelAddBcode)="cancelAddBcode($event)"
      (setAddBcode)="setAddBcode()"
      (delProdotto)="delProdotto($event)"
      (delGEV)="delGEV($event)"
    ></app-modal-edit>

    <!-- contenuto home, nascosto se non si è loggati -->
    <div *ngIf="authService.isAuth()">
      <app-navbar></app-navbar>

      <app-widget-reparti></app-widget-reparti>

      <!-- Table -->
      <app-table-prodotti
        [insNuovo]="insNuovo"
        (openEditPopup)="openEditPopup($event)"
        (openAddPopup)="openAddPopup()"
        (openGEVPopup)="openGEVPopup($event)"
      ></app-table-prodotti>
    </div>
  </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit {
  // Per verificare se l'utente vuole inserire un nuovo prodotto o modificarne uno esistente
  insNuovo: boolean = false;

  constructor( private httpClient: HttpClient, public authService: AuthService, public notificheService: NotificheService, public filtriService: FiltriService) { }

  ngOnInit(): void {
    this.filtriService.getTabacchi();
    this.filtriService.getGEV();
    this.filtriService.getBarcodes();
    this.filtriService.getRepartiTabacchi();
    this.filtriService.getRepartiGEV();
    this.filtriService.getIveTabacchi();
    this.filtriService.getIveGEV();
  }

  openAddPopup() {
    this.insNuovo = true;
  }

  // apertura modal per i tabacchi
  openEditPopup(prodotto: Partial<Tabacchi> ) {
    this.insNuovo = false;
    this.filtriService.tabacchiAttivo = prodotto;
    this.notificheService.prodAttivo = this.filtriService.tabacchiAttivo;
    this.filtriService.getBarcodeTabacchi(this.filtriService.tabacchiAttivo.codice as string);
  }

  // apertura modal per i GEV
  openGEVPopup(prodotto: Partial<Gev> ) {
    this.insNuovo = false;
    this.filtriService.GEVAttivo = prodotto;
    this.notificheService.prodAttivo = this.filtriService.GEVAttivo;
  }

  closeEditPopup() {
    this.filtriService.attivaView = 'articolo';
    this.filtriService.tabacchiAttivo = {};
    this.filtriService.GEVAttivo = {};
  }

  editProdotto(h: NgForm) {
    // se stiamo editando un articolo dei tabacchi
    if (!this.filtriService.mostraGEV) {
      if (this.insNuovo == true) {
        // aggiunta nuovo prodotto
        const url = 'https://gabservizi.it/api-tabacchi/api/tabacchi';

        const httpBody = {
          "id": 0,
          "codice": h.value.codice,
          "descrizione": h.value.desc,
          "prezzoVendita": h.value.price,
          "costo": h.value.costo,
          "iva": h.value.iva,
          "um": h.value.um,
          "prezzo": h.value.pUm,
          "quantitaMinima": h.value.qt,
          "codiceReparto": h.value.codiceRep,
          "confezione": h.value.confezione,
          "unitaMisura": h.value.unitaMisura,
          "peso": h.value.peso,
          "dataDecorrenzaModifica": h.value.dataFutura,
          "prezzoFuturoModifica": h.value.pFuturo
        };
        this.notificheService.prodAttivo.descrizione = h.value.desc;

        this.httpClient.post<Tabacchi>(url, httpBody).subscribe( prod => {
        this.filtriService.tabacchi.push(prod);
        this.filtriService.tabacchiAttivo = prod;
        this.filtriService.getTabacchi();
        });

      // altrimenti modifico prodotto esistente
      } else {
        const url = `https://gabservizi.it/api-tabacchi/api/tabacchi/${this.filtriService.tabacchiAttivo.id}`;

        const httpBody = {
          "id": this.filtriService.tabacchiAttivo.id,
          "codice": this.filtriService.tabacchiAttivo.codice,
          "descrizione": h.value.desc,
          "prezzoVendita": h.value.price,
          "costo": h.value.costo,
          "iva": h.value.iva,
          "um": h.value.um,
          "prezzo": h.value.pUm,
          "quantitaMinima": h.value.qt,
          "codiceReparto": h.value.codiceRep,
          "confezione": h.value.confezione,
          "unitaMisura": h.value.unitaMisura,
          "peso": h.value.peso,
          "dataDecorrenzaModifica" : h.value.dataFutura,
          "prezzoFuturoModifica" : h.value.pFuturo
        };

        this.httpClient.put<Tabacchi>(url, httpBody).subscribe( p => this.filtriService.tabacchi.push(p) );
      }
    } else {
      if (this.insNuovo == true) {
        // aggiunta nuovo G & V
        const url = 'https://gabservizi.it/api-tabacchi/api/gev';

        const httpBody = {
          "id": 0,
          "codice": h.value.codice,
          "descrizione": h.value.desc,
          "prezzoVendita": h.value.price,
          "costo": h.value.costo,
          "iva": h.value.iva,
          "um": h.value.um,
          "dataModifica" : h.value.dataModifica,
          "codiceReparto": h.value.codiceRep,
          "nomeReparto": h.value.nomeRep
        };
        this.notificheService.prodAttivo.descrizione = h.value.desc;

        this.httpClient.post<Gev>(url, httpBody).subscribe( prod => {
        this.filtriService.GEV.push(prod);
        this.filtriService.GEVAttivo = prod;
        this.filtriService.getGEV();
        });

      // altrimenti modifico G & V esistente
      } else {
        const url = `https://gabservizi.it/api-tabacchi/api/gev/${this.filtriService.GEVAttivo.id}`;

        const httpBody = {
          "id": this.filtriService.GEVAttivo.id,
          "codice": this.filtriService.GEVAttivo.codice,
          "descrizione": h.value.desc,
          "prezzoVendita": h.value.price,
          "costo": h.value.costo,
          "iva": h.value.iva,
          "um": h.value.um,
          "dataModifica" : h.value.dataModifica,
          "codiceReparto": h.value.codiceRep,
          "nomeReparto": h.value.nomeRep
        };

        this.httpClient.put<Gev>(url, httpBody).subscribe( p => {
          this.filtriService.GEV.push(p);
          this.filtriService.getGEV();
        });
      }
    }
  }

  // ***************** CANCELLA *****************

  // Cancella tabacchi
  delProdotto(prodotto: Partial<Tabacchi>) {
    const url = `https://gabservizi.it/api-tabacchi/api/tabacchi/${prodotto.id}`;

    const httpOptions = { body: {"id" : prodotto.id} };

    return this.httpClient.delete(url, httpOptions).subscribe( (p) => {
      this.filtriService.tabacchi = this.filtriService.tabacchi.filter( item => item.id != this.filtriService.tabacchiAttivo.id)
      this.filtriService.tabacchiAttivo = {};
      this.filtriService.attivaView = 'articolo';
      this.ngOnInit();
    });
  }

  // Cancella GEV
  delGEV(prodotto: Partial<Gev>) {
    const url = `https://gabservizi.it/api-tabacchi/api/gev/${prodotto.id}`;

    const httpOptions = { body: {"id" : prodotto.id} };

    return this.httpClient.delete(url, httpOptions).subscribe( (p) => {
      this.filtriService.GEV = this.filtriService.GEV.filter( item => item.id != this.filtriService.GEVAttivo.id)
      this.filtriService.GEVAttivo = {};
      this.filtriService.attivaView = 'articolo';
      this.ngOnInit();
    });
  }

  // ***************** BARCODE ******************

  // setta la creazione di un nuovo barcode
  setAddBcode() {
    this.filtriService.addBcodeAttiva = !this.filtriService.addBcodeAttiva;
    this.filtriService.editBcodeAttiva = false;
  }

  cancelAddBcode(j: NgForm) {
    this.filtriService.addBcodeAttiva = false;
    j.reset();
  }

  addBarcode(j: NgForm) {
    const url = 'https://gabservizi.it/api-tabacchi/api/tabacchi/barcode';

    // se sto modificando dei campi non invio nuovi prodotti
    if (this.filtriService.editBcodeAttiva == false) {
      if (j.value.bcode0 !== '') {
        const httpBody = { "codiceBarcode": j.value.bcode0, "codiceArticolo": this.filtriService.tabacchiAttivo.codice, "pezziConfezione": j.value.pzxcf0 };
        this.httpClient.post<Barcode>(url, httpBody).subscribe( b => {
          this.filtriService.barcodes.push(b);
          this.filtriService.getBarcodeTabacchi(this.filtriService.tabacchiAttivo.codice as string);
        } );
      }
      j.reset();
      this.filtriService.addBcodeAttiva = false;
    }
  }

  // Modifica Barcode
  editBcode0: string = '';
  editPezzi0: number = 0;

  settaEditBcode(bc: Partial<Barcode>) {
    this.filtriService.addBcodeAttiva = false;
    this.editBcode0 = bc.codiceBarcode as string;
    this.editPezzi0 = bc.pezziConfezione as number;
    this.filtriService.editBcodeAttiva = true;
    this.filtriService.barcodeDaEliminare = bc.codiceBarcode as string;
  }

  editBarcodes(k: NgForm) {
    if (k.value.editBcode0 !== '') {
      const url = `https://gabservizi.it/api-tabacchi/api/tabacchi/barcode/${this.editBcode0}`;

      const httpBody = { "codiceBarcode": k.value.editBcode0, "codiceArticolo": this.filtriService.tabacchiAttivo.codice, "pezziConfezione": k.value.editPezzi0 };

      this.notificheService.barcodeAttivo = k.value.bcode0;

      this.httpClient.put<Barcode>(url, httpBody).subscribe( b => {
        this.filtriService.barcodes.push(b);
        this.filtriService.getBarcodeTabacchi(this.filtriService.tabacchiAttivo.codice as string);
      });

      this.filtriService.editBcodeAttiva = false;
    }
  }
}
