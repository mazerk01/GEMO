import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FiltriService } from 'src/app/core/filtri.service';

@Component({
  selector: 'app-body-mobile',
  template: `
  <div id="wrapperBody">
    <div id="cardRicerca" class="card">
      <div class="card-body" style="padding: 0.5em;">
        <form #f="ngForm">
          <div class="input-group" style="margin-top: 0.1em;">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="#bfbfbf" class="bi bi-search" viewBox="0 0 16 16" style="margin-top: 0.3em;">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>

            <input id="casellaRicerca" type="search" class="form-control ms-1" placeholder="Cerca..." name="name" [(ngModel)]="searchText">

            <div id="wrapperCheckbox" class="form-check form-switch" (click)="this.filtriService.associaBarcodes();">
              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
            </div>

          </div>
        </form>
      </div>
    </div>

    <div *ngIf="!this.filtriService.mostraGEV">
      <div *ngFor="let cercaProdotto of this.filtriService.cercaTabacchi | searchFilter: searchText | paginate: { itemsPerPage: pageSize, currentPage: page, totalItems: count }; let i = index" [class.active]="i == currentIndex">
        <div id="listaArticoli" class="card" (click)="openEditPopup.emit(cercaProdotto)" data-bs-toggle="modal" data-bs-target="#modalMobile">
          <div class="card-body">

            <div class="container">
              <div class="row">
                <div class="col-6">
                  <img id="imgReparto" src="./assets/images/widgetFiltri/{{cercaProdotto.codiceReparto}}.jpg">
                </div>

                <div class="col-6" style="display: flex; justify-content: flex-end; margin-top: 0.5em;">
                  <p style="font-weight: 700;">{{cercaProdotto.prezzoVendita.toFixed(2) | currency: 'EUR' : 'symbol' : '.2-2' : 'it'}}</p>
                </div>

              </div>

              <div class="row">
                <p style="word-break: break-all; color: #00000094; margin-bottom: 0;">{{cercaProdotto.descrizione}}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div *ngIf="this.filtriService.mostraGEV">
      <div *ngFor="let cercaProdotto of this.filtriService.cercaGEV | searchFilter: searchText | paginate: { itemsPerPage: pageSize, currentPage: page, totalItems: count }; let i = index" [class.active]="i == currentIndex">
        <div id="listaArticoli" class="card" (click)="openGEVPopup.emit(cercaProdotto)" data-bs-toggle="modal" data-bs-target="#modalMobile">
          <div class="card-body">

            <div class="container">
              <div class="row">
                <div class="col-6">
                  <img id="imgReparto" src="./assets/images/widgetFiltri/{{cercaProdotto.codiceReparto}}.jpg">
                </div>

                <div class="col-6" style="display: flex; justify-content: flex-end; margin-top: 0.5em;">
                  <p style="font-weight: 700;">{{cercaProdotto.prezzoVendita.toFixed(2) | currency: 'EUR' : 'symbol' : '.2-2' : 'it'}}</p>
                </div>

              </div>

              <div class="row">
                <p style="word-break: break-all; color: #00000094; margin-bottom: 0;">{{cercaProdotto.descrizione}}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row" style="margin-top: 1em;">
        <pagination-controls class="my-pagination" (pageChange)="handlePageChange($event)" [maxSize]="5" previousLabel="" nextLabel="" style="text-align: center;"></pagination-controls>
      </div>

      <div class="row">
        <div class="mt-3" style="margin-bottom: 12em; text-align: center;">
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
  `,
  styles: [`
  #wrapperBody {
    margin: 1em;
  }

  #cardRicerca {
    border-radius: 10px;
  }

  #casellaRicerca {
    border: none;
    background: rgb(255, 255, 255, 0);
  }

  #flexSwitchCheckDefault {
    height: 1.7em;
    width: 3em;
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

  #listaArticoli {
    margin-top: 1em;
    border-radius: 10px;
  }

  #imgReparto {
    width: 35px;
    height: 35px;
    padding: 0;
  }

  .my-pagination /deep/ .ngx-pagination{
    padding: 0;
  }
  `
  ]
})
export class HeaderBodyComponent {

  @Input() insNuovo: boolean = false;
  @Output() openEditPopup: EventEmitter<any> = new EventEmitter<any>();
  @Output() openAddPopup: EventEmitter<any> = new EventEmitter<any>();
  @Output() openGEVPopup: EventEmitter<any> = new EventEmitter<any>();

  constructor( public filtriService: FiltriService) { }

  // per la custom pipe della ricerca dinamica
  searchText: string = '';

  // per la paginazione di Ngx-Pagination
  currentIndex = -1;
  page = 1;
  count = 0;
  pageSize = 10;
  pageSizes = [10, 20, 30];

  handlePageChange(event: any) {
    this.page = event;
  }

  handlePageSizeChange(event: any) {
    this.pageSize = event.target.value;
    this.page = 1;
  }

}
