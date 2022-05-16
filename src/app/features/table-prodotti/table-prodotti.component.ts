import { Component, EventEmitter, Input, Output } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeIt from '@angular/common/locales/it'
import { FiltriService } from 'src/app/core/filtri.service';
import { NotificheService } from 'src/app/core/notifiche.service';

registerLocaleData(localeIt, 'it');

@Component({
  selector: 'app-table-prodotti',
  template: `
  <div id="cardTabella" class="card">
    <div class="card-body">

      <div class="container" style="max-width: 100%;">
        <div class="row">

          <div class="container" style="max-width: -webkit-fill-available;">
            <div class="row" style="margin-bottom: 2em;">
              <div id="cardRicerca" class="card">
                <div class="card-body" style="padding: 0.5em; padding-right: 0;">
                  <form #f="ngForm">
                    <div class="input-group" style="margin-top: 0.1em;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16" style="margin-top: 0.5em;">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                      </svg>

                      <input id="casellaRicerca" type="search" class="form-control ms-1" placeholder="Cerca..." name="name" [(ngModel)]="searchText">

                      <div id="wrapperCheckbox" class="form-check form-switch" (click)="this.filtriService.associaBarcodes();">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
                        <label id="labelCheckbox" class="form-check-label" for="flexSwitchCheckDefault">Barcode</label>
                      </div>

                      <button id="tastoAggiungi" class="btn btn-light text-light" type="button" data-bs-target="#modalEdit" data-bs-toggle="modal" (click)="openAddPopup.emit()">AGGIUNGI</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <!-- Tabella per la visualizzazione dei tabacchi -->
            <div class="row" *ngIf="!this.filtriService.mostraGEV">
              <div class="table-responsive">
                <table class="table table-hover table-borderless text-dark align-middle" style="margin-top: 1em;">
                  <thead>
                    <tr style="color: #939393;">
                      <th scope="col" class="text-start" style="width: 6%;" [appSort]="this.filtriService.cercaTabacchi" data-order="desc" data-name="codice">Codice</th>
                      <th scope="col" class="text-start" style="width: 40%;" [appSort]="this.filtriService.cercaTabacchi" data-order="desc" data-name="descrizione">Descrizione</th>
                      <th scope="col" class="text-start" style="width: 30%;" *ngIf="this.filtriService.cercaReparto == 'All'">Reparto</th>
                      <th scope="col" class="text-start" style="width: 15%;" *ngIf="this.filtriService.cercaReparto !== 'All'" [appSort]="this.filtriService.cercaTabacchi" data-order="desc" data-name="iva">IVA</th>
                      <th scope="col" class="text-start" style="width: 15%;" *ngIf="this.filtriService.cercaReparto !== 'All'" [appSort]="this.filtriService.cercaTabacchi" data-order="desc" data-name="costo">P. ACQ</th>
                      <th scope="col" class="text-end" style="width: 8%;" [appSort]="this.filtriService.cercaTabacchi" data-order="desc" data-name="prezzoVendita">P. Vend</th>
                      <th scope="col" class="text-center" style="width: 10%;">Decorrenza</th>
                      <th scope="col" class="text-end" style="width: 8%;" [appSort]="this.filtriService.cercaTabacchi" data-order="desc" data-name="prezzoFuturoModifica">Futuro</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr (click)="openEditPopup.emit(cercaProdotto)" data-bs-toggle="modal" data-bs-target="#modalEdit" *ngFor="let cercaProdotto of this.filtriService.cercaTabacchi | searchFilter: searchText | paginate: { itemsPerPage: pageSize, currentPage: page, totalItems: count }; let i = index" [class.active]="i == currentIndex">
                      <td class="text-start"> {{ cercaProdotto.codice }} </td>
                      <td class="text-start"> {{ cercaProdotto.descrizione }} </td>
                      <td class="text-start" *ngIf="this.filtriService.cercaReparto == 'All'"> {{ cercaProdotto.nomeReparto }} </td>
                      <td class="text-start" *ngIf="this.filtriService.cercaReparto !== 'All'"> {{ cercaProdotto.iva }}% </td>
                      <td class="text-start" *ngIf="this.filtriService.cercaReparto !== 'All'">{{ (cercaProdotto.costo || 0).toFixed(2) | currency: 'EUR' : 'symbol' : '.2-2' : 'it' }}</td>
                      <td class="text-end">{{ (cercaProdotto.prezzoVendita || 0).toFixed(2) | currency: 'EUR' : 'symbol' : '.2-2' : 'it' }}</td>
                      <td class="text-center">
                        <span class="badge rounded-pill bg-{{(this.filtriService.giorniDecorrenza(cercaProdotto) <= 0) ? 'dark' : (this.filtriService.giorniDecorrenza(cercaProdotto) > 14) ? 'success' : (this.filtriService.giorniDecorrenza(cercaProdotto) <= 7) ? 'danger' : 'warning' }}">
                          {{ (this.filtriService.giorniDecorrenza(cercaProdotto) >= 0) ? this.filtriService.giorniDecorrenza(cercaProdotto) : '0' }} gg
                        </span>
                      </td>
                      <td class="text-end">{{ (cercaProdotto.prezzoFuturoModifica || 0).toFixed(2) | currency: 'EUR' : 'symbol' : '.2-2' : 'it' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Tabella per la visualizzazione dei gratta & vinci -->
            <div class="row" *ngIf="this.filtriService.mostraGEV">
              <div class="table-responsive">
                <table class="table table-hover table-borderless text-dark align-middle" style="margin-top: 1em;">
                  <thead>
                    <tr style="color: #939393;">
                      <th scope="col" class="text-start" style="width: 12%;" [appSort]="this.filtriService.cercaGEV" data-order="desc" data-name="codice">Codice</th>
                      <th scope="col" class="text-start" style="width: 38%;" [appSort]="this.filtriService.cercaGEV" data-order="desc" data-name="descrizione">Descrizione</th>
                      <th scope="col" class="text-end" style="width: 25%;" *ngIf="this.filtriService.cercaReparto == 'All'">Reparto</th>
                      <th scope="col" class="text-end" style="width: 25%;" *ngIf="this.filtriService.cercaReparto !== 'All'" [appSort]="this.filtriService.cercaGEV" data-order="desc" data-name="costo">P. ACQ</th>
                      <th scope="col" class="text-end" style="width: 25%;" [appSort]="this.filtriService.cercaGEV" data-order="desc" data-name="prezzoVendita">P. Vend</th>

                    </tr>
                  </thead>
                  <tbody>
                    <tr (click)="openGEVPopup.emit(cercaProdotto)" data-bs-toggle="modal" data-bs-target="#modalEdit" *ngFor="let cercaProdotto of this.filtriService.cercaGEV | searchFilter: searchText | paginate: { itemsPerPage: pageSize, currentPage: page, totalItems: count }; let i = index" [class.active]="i == currentIndex">
                      <td class="text-start"> {{ cercaProdotto.codice }} </td>
                      <td class="text-start"> {{ cercaProdotto.descrizione }} </td>
                      <td class="text-end" *ngIf="this.filtriService.cercaReparto == 'All'"> {{ cercaProdotto.nomeReparto }} </td>
                      <td class="text-end" *ngIf="this.filtriService.cercaReparto !== 'All'">{{ (cercaProdotto.costo || 0).toFixed(2) | currency: 'EUR' : 'symbol' : '.2-2' : 'it' }}</td>
                      <td class="text-end">{{ (cercaProdotto.prezzoVendita || 0).toFixed(2) | currency: 'EUR' : 'symbol' : '.2-2' : 'it' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div class="row" style="margin-top: 2em;">
              <div class="col-6">
                <pagination-controls class="my-pagination" (pageChange)="handlePageChange($event)" previousLabel="Precedente" nextLabel="Successiva"></pagination-controls>
              </div>

              <div class="col-6">
                <div class="mt-3" style="position: absolute; right: 0; margin-right: 4em;">
                  Elementi per pagina:
                  <select (change)="handlePageSizeChange($event)">
                    <option *ngFor="let size of pageSizes" [ngValue]="size">
                      {{ size }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
  #cardTabella {
    border-radius: 20px;
    margin: 6.5em;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(209, 213, 219, 0.3);
  }

  th {
    font-weight: 400;
  }

  #wrapperCheckbox {
    margin: auto 2em auto 2em;
  }

  #labelCheckbox:hover {
    color: rgb(186 189 255);
  }

  #cardRicerca {
    border-radius: 30px;
    margin-top: 0.8em;
    border: none;
  }

  /* Per cambiare il colore del focus sulla input box */
  .form-control:focus {
    box-shadow: none;
    border-bottom: 1px solid black !important;
  }

  #casellaRicerca {
    border: none;
    background: rgb(255, 255, 255, 0);
  }

  #flexSwitchCheckDefault {
    height: 1.7em;
    width: 4em;
  }

  /* switch attivo */
  .form-check-input:checked {
    background-color: #babdff;
    border: none;
  }

  #flexSwitchCheckDefault:hover {
    border-color: rgb(186 189 255);
  }

  #flexSwitchCheckDefault:focus {
    box-shadow: none;
  }

  #labelCheckbox {
    margin-top: 0.5em;
    margin-left: 1em;
    font-weight: 700;
    font-size: 0.9em;
    color: #434343;
  }

  #tastoAggiungi {
    border-radius: 40px;
    height: 3em;
    width: 12em;
    border: none;
    background: #343434;
    letter-spacing: 1.5px;
    font-weight: 700;
  }

  #tastoAggiungi:hover {
    background: #8282ff;
  }

  /* laptop extra-piccoli */
  @media all and (min-width: 769px) and (max-width: 899px) {
    #cardTabella {
      margin: 2em;
    }

    #tastoAggiungi {
      width: 10em;
    }
  }

  /* laptop piccoli */
  @media all and (min-width: 900px) and (max-width: 1024px) {
    #cardTabella {
      margin-top: 3em;
      margin-left: 5.5em;
      margin-right: 5.5em;
    }
  }
  `
  ]
})

export class TableProdottiComponent {
  @Input() insNuovo: boolean = false;
  @Output() openEditPopup: EventEmitter<any> = new EventEmitter<any>();
  @Output() openAddPopup: EventEmitter<any> = new EventEmitter<any>();
  @Output() openGEVPopup: EventEmitter<any> = new EventEmitter<any>();

  constructor( public filtriService: FiltriService, public notificheService: NotificheService) { }

  // per la custom pipe della ricerca dinamica
  searchText: string = '';

  // per la paginazione di Ngx-Pagination
  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 20;
  pageSizes = [20, 30, 40];

  handlePageChange(event: any) {
    this.page = event;
  }

  handlePageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.page = 1;
  }

}

