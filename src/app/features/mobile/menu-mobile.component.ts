import { Component, EventEmitter, Output } from '@angular/core';
import { FiltriService } from 'src/app/core/filtri.service';

@Component({
  selector: 'app-menu-mobile',
  template: `
    <div id="wrapperMenu" class="card">
      <div class="card-body" style="padding-top: 0.5em; padding-bottom: 0.5em;">
        <div class="container" style="padding: 0;">
          <div class="row" style="justify-content: space-between;">

            <!-- quando la ricerca per Barcodes è disattivata -->
            <div id="tastoMenu" class="card" (click)="this.filtriService.toggleRicercaBarcodes();" *ngIf="!this.filtriService.attivaRicercaBarcodes">
              <div class="card-body">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#b2bcc8" class="bi bi-upc-scan" viewBox="0 0 16 16">
                  <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5zM3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"/>
                </svg>
              </div>
            </div>

            <!-- quando la ricerca per Barcodes è attiva -->
            <div id="tastoMenu" class="card" (click)="this.filtriService.toggleRicercaBarcodes();" *ngIf="this.filtriService.attivaRicercaBarcodes">
              <div class="card-body">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="black" class="bi bi-upc-scan" viewBox="0 0 16 16">
                  <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5zM3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"/>
                </svg>
              </div>
            </div>

            <div id="tastoMenu" class="card me-2" data-bs-target="#modalMobile" data-bs-toggle="modal" (click)="this.filtriService.settaModalReparti()">
              <div class="card-body">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#b2bcc8" class="bi bi-funnel" viewBox="0 0 16 16">
                  <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
                </svg>
              </div>
            </div>

            <div id="tastoMenuCentrale" class="card" (click)="this.filtriService.switchCategoria()" style="background-color: {{this.filtriService.mostraGEV ? '#f1b5b5' : '#b5bef1'}}">
              <div class="card-body" style="padding-top: 0.7em;">
                <div class="animate__animated" [class.animate__rotateIn]="!this.filtriService.mostraGEV" [class.animate__flipInY]="this.filtriService.mostraGEV">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="white" class="bi bi-hexagon" viewBox="0 0 16 16">
                    <path d="M14 4.577v6.846L8 15l-6-3.577V4.577L8 1l6 3.577zM8.5.134a1 1 0 0 0-1 0l-6 3.577a1 1 0 0 0-.5.866v6.846a1 1 0 0 0 .5.866l6 3.577a1 1 0 0 0 1 0l6-3.577a1 1 0 0 0 .5-.866V4.577a1 1 0 0 0-.5-.866L8.5.134z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div id="tastoMenu" class="card ms-2" data-bs-target="#modalMobile" data-bs-toggle="modal" (click)="openAddPopup.emit()">
              <div class="card-body">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#b2bcc8" class="bi bi-plus-lg" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>
              </div>
            </div>

            <div id="tastoMenu" class="card">
              <div class="card-body">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#b2bcc8" class="bi bi-gear" viewBox="0 0 16 16">
                  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
                  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
                </svg>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
  #wrapperMenu {
    position: fixed;
    bottom: 0;
    width: 100%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    border: none;
    background-color: #fff7f1;
  }

  #tastoMenu {
    width: 3.5em;
    text-align: center;
    border: none;
    background-color: #fff7f1;
  }

  #tastoMenu .card-body {
    padding-left: 0;
    padding-right: 0;
  }

  #tastoMenuCentrale {
    height: 3em;
    width: 3em;
    margin-top: 0.3em;
    text-align: center;
    border: none;
    border-radius: 15px;
  }

  #tastoMenuCentrale .card-body {
    padding-left: 0;
    padding-right: 0;
  }

  #imgCategoria {
    width: 40px;
    height: 40px;
  }
  `
  ]
})
export class MenuMobileComponent {

  constructor( public filtriService: FiltriService) { }

  @Output() openAddPopup: EventEmitter<any> = new EventEmitter<any>();


}
