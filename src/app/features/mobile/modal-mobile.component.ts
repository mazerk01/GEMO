import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FiltriService } from 'src/app/core/filtri.service';
import { Gev } from 'src/app/core/gev.model';
import { Tabacchi } from 'src/app/core/tabacchi.model';

@Component({
  selector: 'app-modal-mobile',
  template: `
  <div id="modalMobile" class="modal fade" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-body">

        <div *ngIf="this.filtriService.attivaModalReparti">

          <div class="container">
            <div class="row">
              <div class="col-10">
                <p>Reparti</p>
              </div>

              <div class="col-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16" data-bs-dismiss="modal" (click)="closeEditPopup.emit()">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Lista reparti (Tabacchi) -->
          <div *ngIf="!this.filtriService.mostraGEV">

            <div id="cardReparto" class="card">
              <div class="card-body">
                <div id="bottoneReparto" [ngStyle]="{'filter' : this.filtriService.cercaReparto == 'All' ? 'none' : 'saturate(0)'}" data-bs-dismiss="modal" (click)="this.filtriService.settaTutti(); closeEditPopup.emit()">

                  <div class="container">
                    <div class="row">
                      <div class="col-4" style="display: flex; align-self: center;">
                        <img id="imgReparto" src="./assets/images/widgetFiltri/all.jpg">
                      </div>

                      <div class="col-8" style="display: flex; align-self: center; font-size: 14px;">
                        TUTTI
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div *ngFor="let repartoTabacchi of this.filtriService.repartiTabacchi">
              <div id="cardReparto" class="card">
                <div class="card-body">
                  <div id="bottoneReparto" [ngStyle]="{'filter' : this.filtriService.cercaReparto == repartoTabacchi.codice ? 'none' : 'saturate(0)'}" data-bs-dismiss="modal" (click)="this.filtriService.settaReparto(repartoTabacchi); closeEditPopup.emit()">

                    <div class="container">
                      <div class="row">
                        <div class="col-4" style="display: flex; align-self: center;">
                          <img id="imgReparto" src="./assets/images/widgetFiltri/{{repartoTabacchi.codice}}.jpg">
                        </div>

                        <div class="col-8" style="display: flex; align-self: center; font-size: 14px;">
                          {{repartoTabacchi.descrizione}}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Lista reparti (GRATTA E VINCI) -->
          <div *ngIf="this.filtriService.mostraGEV">

            <div id="cardReparto" class="card">
              <div class="card-body">
                <!-- Tutti i Reparti -->
                <div id="bottoneReparto" [ngStyle]="{'filter' : this.filtriService.cercaReparto == 'All' ? 'none' : 'saturate(0)'}" data-bs-dismiss="modal" (click)="this.filtriService.settaTutti(); closeEditPopup.emit()">

                  <div class="container">
                    <div class="row">
                      <div class="col-4" style="display: flex; align-self: center;">
                        <img id="imgReparto" src="./assets/images/widgetFiltri/all.jpg">
                      </div>

                      <div class="col-8" style="display: flex; align-self: center; font-size: 14px;">
                        TUTTI
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div *ngFor="let repartoGEV of this.filtriService.repartiGEV">
              <div id="cardReparto" class="card">
                <div class="card-body">
                  <div id="bottoneReparto" [ngStyle]="{'filter' : this.filtriService.cercaReparto == repartoGEV.codice ? 'none' : 'saturate(0)'}" data-bs-dismiss="modal" (click)="this.filtriService.settaReparto(repartoGEV); closeEditPopup.emit()">

                    <div class="container">
                      <div class="row">
                        <div class="col-4" style="display: flex; align-self: center;">
                          <img id="imgReparto" src="./assets/images/widgetFiltri/{{repartoGEV.codice}}.jpg">
                        </div>

                        <div class="col-8" style="display: flex; align-self: center; font-size: 14px;">
                          {{repartoGEV.descrizione}}
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div *ngIf="!this.filtriService.attivaModalReparti">
          <form #h="ngForm">
            <div class="container-fluid" style="padding: 0;">

              <div class="row" style="margin-top: 0.5em; margin-bottom: 0.5em;">
                <div class="col-10">
                  <p style="font-size: 1.2em;">{{insNuovo ? 'Nuovo' : 'Modifica'}}</p>
                </div>

                <div class="col-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16" data-bs-dismiss="modal" (click)="closeEditPopup.emit()">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                  </svg>
                </div>
              </div>

              <div class="row mb-1" *ngIf="!this.filtriService.mostraGEV">

                <div class="col-12">
                  <div id="cardSelettore" class="card">
                    <div class="card-body" style="padding: 0.4em;">
                      <ul class="nav nav-pills nav-fill" id="myTab">
                        <li class="nav-item">
                          <button class="nav-link {{this.filtriService.attivaView == 'articolo' ? 'active' : ''}}" data-bs-toggle="tab" type="button" (click)="this.filtriService.settaFooterArticolo()"> Articolo </button>
                        </li>
                        <li class="nav-item" *ngIf="!this.filtriService.mostraGEV">
                          <button class="nav-link {{this.filtriService.attivaView == 'barcode' ? 'active' : ''}}" data-bs-toggle="tab" type="button" (click)="this.filtriService.settaFooterBarcode()">Barcodes</button>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>
              </div>

              <!-- Contenuto tab Articolo - Tabacchi -->
              <div *ngIf="(this.filtriService.attivaView == 'articolo' && !this.filtriService.mostraGEV)" style="margin: 0 auto 0;">

                <div *ngIf="this.filtriService.mobileDelete">
                  <div class="container" style="padding: 0;">
                    <div class="row" style="margin: 2em 0 2em;">
                      <div id="cardListaBarcodes" class="card" style="margin-top: 3em;">
                        <div class="card-body">
                          <div class="row mb-4" style="justify-content: center;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                            </svg>
                          </div>

                          <div class="row mb-2" style="text-align: center; font-size: 1.1rem; margin-top: 2em;">
                            <div class="col-12">
                              <p style="font-size: 1.2rem;">Sei sicuro di voler eliminare
                                <br>
                                <span style="font-weight: 700;">{{this.filtriService.tabacchiAttivo.descrizione }} ?</span>

                              </p>
                            </div>
                          </div>

                          <div class="row" style="justify-content: space-evenly;">
                            <!-- Annulla -->
                            <button id="bottoneMini" type="button" class="btn btn-dark mb-1" (click)="this.filtriService.settaDeleteMobile()">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                              </svg>
                            </button>

                            <!-- lancia addBarcode (componente home) -->
                            <button id="bottoneMini" type="button" class="btn btn-success ms-2 mb-1" data-bs-dismiss="modal" (click)="delProdotto.emit(this.filtriService.tabacchiAttivo)">
                              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                              </svg>
                            </button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div *ngIf="!this.filtriService.mobileDelete">
                  <div id="cardForm" class="card">
                    <div class="card-body" style="padding: 0;">

                      <div class="row mt-3 mb-3">
                        <div class="col-12" *ngIf="!insNuovo">
                          <label>Codice</label>
                          <input type="text" class="form-control" name="codice" [(ngModel)]="this.filtriService.tabacchiAttivo.codice" disabled readonly>
                        </div>

                        <div class="col-12" *ngIf="insNuovo">
                          <label>Codice *</label>
                          <input type="text" class="form-control" name="codice" [(ngModel)]="this.filtriService.tabacchiAttivo.codice" #codice="ngModel" required>
                        </div>
                      </div>

                      <div class="row mb-4">
                        <div class="col-12">
                          <label>Descrizione *</label>
                          <input type="text" class="form-control" name="desc" [(ngModel)]="this.filtriService.tabacchiAttivo.descrizione" #desc="ngModel" required>
                        </div>
                      </div>

                      <div class="row mb-4">
                        <div class="col-12">
                          <div class="input-group">
                            <label class="input-group-text" for="inputGroupSelect01" id="basic-addon1">IVA *</label>
                            <select class="form-select" id="inputGroupSelect01" name="iva" [(ngModel)]="this.filtriService.tabacchiAttivo.iva" #iva="ngModel" required>
                              <option value="" selected disabled>Scegli...</option>
                              <option *ngFor="let ivaTab of this.filtriService.iveTabacchi" value="{{ivaTab.iva}}">{{ivaTab.iva}}%</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-12">
                          <div class="input-group">
                            <label class="input-group-text" for="inputGroupSelect01" id="basic-addon1">Reparto *</label>
                            <select class="form-select" id="inputGroupSelect01" name="codiceRep" [(ngModel)]="this.filtriService.tabacchiAttivo.codiceReparto" #codiceRep="ngModel" required>
                              <option value="" selected disabled>Scegli...</option>
                              <option *ngFor="let rep of this.filtriService.repartiTabacchi" value="{{rep.codice}}">{{rep.descrizione}}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="cardForm" class="card">
                    <div class="card-body" style="padding: 0;">

                      <div class="row mb-3">
                        <div class="col-12">
                          <label>Prezzo d'acquisto *</label>

                          <div class="input-group">
                            <input type="number" class="form-control text-end" name="costo" [ngModel]="this.filtriService.tabacchiAttivo.costo | number : '1.2-2'" #costo="ngModel" required>
                            <span class="input-group-text" id="basic-addon2">€</span>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-12">
                          <label>Prezzo di vendita *</label>

                          <div class="input-group">
                            <input type="number" class="form-control text-end" name="price" [ngModel]="this.filtriService.tabacchiAttivo.prezzoVendita | number : '1.2-2'" #price="ngModel" required>
                            <span class="input-group-text" id="basic-addon2">€</span>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-6">
                          <label>UM</label>
                          <input type="text" class="form-control text-end" name="um" [ngModel]="this.filtriService.tabacchiAttivo.um | number : '1.2-2'">
                        </div>

                        <div class="col-6">
                          <label>Prezzo UM</label>
                          <div class="input-group">
                            <input type="number" class="form-control text-end" name="pUm" [ngModel]="this.filtriService.tabacchiAttivo.prezzo | number : '1.2-2'">
                            <span class="input-group-text" id="basic-addon2">€</span>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-12">
                          <label>Decorrenza</label>
                          <input class="form-control" type="date" name="dataFutura" [ngModel]="this.filtriService.tabacchiAttivo.dataDecorrenzaModifica | date: 'yyyy-MM-dd'" (ngModelChange)="this.filtriService.tabacchiAttivo.dataDecorrenzaModifica = $event">
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-12">
                          <label>Prezzo futuro</label>
                          <div class="input-group">
                            <input type="number" class="form-control text-end" name="pFuturo" [ngModel]="this.filtriService.tabacchiAttivo.prezzoFuturoModifica | number : '1.2-2'">
                            <span class="input-group-text" id="basic-addon2">€</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="cardForm" class="card">
                    <div class="card-body" style="padding: 0;">

                      <div class="row mb-3">

                        <div class="col-4" style="padding-right: 0;">
                          <label>Peso</label>
                          <input type="number" class="form-control text-end" name="peso" [ngModel]="this.filtriService.tabacchiAttivo.peso | number : '1.2-2'" style="border-top-right-radius: 0; border-bottom-right-radius: 0;">
                        </div>

                        <div class="col-4" style="padding-left: 0;">
                          <label style="margin-left: 0.5em;">Unità</label>
                          <select class="form-select text-start" name="unitaMisura" [(ngModel)]="this.filtriService.tabacchiAttivo.unitaMisura" style="border-top-left-radius: 0; border-bottom-left-radius: 0;">
                            <option value="" selected disabled>Scegli...</option>
                            <option value="KG">Kg</option>
                            <option value="GR">Gr</option>
                          </select>
                        </div>

                        <div class="col-4">
                          <label>Q.tà min</label>
                          <input type="number" class="form-control text-end" name="qt" [(ngModel)]="this.filtriService.tabacchiAttivo.quantitaMinima">
                        </div>

                      </div>

                      <div class="row mt-2 mb-4">
                        <div class="col-12">
                          <label>Confezione</label>
                          <input type="text" class="form-control" name="confezione" [(ngModel)]="this.filtriService.tabacchiAttivo.confezione">
                        </div>
                      </div>

                    </div>
                  </div>

                  <div class="row mb-4">
                    <div [hidden]="h.valid" style="font-weight: 700; color: #b10000;">
                      I campi con l'asterisco (*) sono obbligatori
                    </div>
                  </div>

                  <div class="row">

                    <div class="col-4">
                      <button id="bottoneElimina" type="button" class="btn btn-primary w-100" (click)="this.filtriService.settaDeleteMobile()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
                      </button>
                    </div>

                    <div class="col-8">
                      <button id="bottoneSalva" type="submit" class="btn btn-primary w-100" (click)="editProdotto.emit(h)" [disabled]="h.invalid"> CONFERMA </button>
                    </div>

                  </div>

                </div>

              </div> <!-- contenuto tab-articolo - Tabacchi -->

              <!-- Contenuto tab Articolo - GEV -->
              <div *ngIf="(this.filtriService.attivaView == 'articolo' && this.filtriService.mostraGEV)" style="margin: 0 auto 0;">

                <div *ngIf="this.filtriService.mobileDelete">
                  <div class="container" style="padding: 0;">
                    <div class="row" style="margin: 2em 0 2em;">
                      <div id="cardListaBarcodes" class="card" style="margin-top: 3em;">
                        <div class="card-body">
                          <div class="row mb-4" style="justify-content: center;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                            </svg>
                          </div>

                          <div class="row mb-2" style="text-align: center; font-size: 1.1rem; margin-top: 2em;">
                            <div class="col-12">
                              <p style="font-size: 1.2rem;">Sei sicuro di voler eliminare
                                <br>
                                <span style="font-weight: 700;">{{this.filtriService.GEVAttivo.descrizione }} ?</span>
                              </p>
                            </div>
                          </div>

                          <div class="row" style="justify-content: space-evenly;">
                            <!-- Annulla -->
                            <button id="bottoneMini" type="button" class="btn btn-dark mb-1" (click)="this.filtriService.settaDeleteMobile()">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                              </svg>
                            </button>

                            <!-- lancia addBarcode (componente home) -->
                            <button id="bottoneMini" type="button" class="btn btn-success ms-2 mb-1" data-bs-dismiss="modal" (click)="delGEV.emit(this.filtriService.GEVAttivo)">
                              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                              </svg>
                            </button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div *ngIf="!this.filtriService.mobileDelete">
                  <div id="cardForm" class="card">
                    <div class="card-body" style="padding: 0;">

                      <div class="row mt-3 mb-3">
                        <!-- Se si sta modificando un prodotto esistente codice articolo è disabled -->
                        <div class="col-12" *ngIf="!insNuovo">
                          <label>Codice</label>
                          <input type="text" class="form-control" name="codice" [(ngModel)]="this.filtriService.GEVAttivo.codice" disabled readonly>
                        </div>

                        <div class="col-12" *ngIf="insNuovo">
                          <label>Codice *</label>
                          <input type="text" class="form-control" name="codice" [(ngModel)]="this.filtriService.GEVAttivo.codice" #codice="ngModel" required>
                        </div>

                      </div>

                      <div class="row mb-4">
                        <div class="col-12">
                          <label>Descrizione *</label>
                          <input type="text" class="form-control" name="desc" [(ngModel)]="this.filtriService.GEVAttivo.descrizione" #desc="ngModel" required>
                        </div>
                      </div>

                      <div class="row mb-4">
                        <div class="col-12">
                          <div class="input-group">
                            <label class="input-group-text" for="inputGroupSelect01" id="basic-addon1">IVA *&nbsp;&nbsp;</label>
                            <select class="form-select" id="inputGroupSelect01" name="iva" [(ngModel)]="this.filtriService.GEVAttivo.iva" #iva="ngModel" required>
                              <option value="" selected disabled>Scegli...</option>
                              <option *ngFor="let ivaGEV of this.filtriService.iveGEV" value="{{ivaGEV.iva}}">{{ivaGEV.iva}}%</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-12">
                          <div class="input-group">
                            <label class="input-group-text" for="inputGroupSelect01" id="basic-addon1">Reparto *&nbsp;&nbsp;</label>
                            <select class="form-select" id="inputGroupSelect01" name="codiceRep" [(ngModel)]="this.filtriService.GEVAttivo.codiceReparto" #codiceRep="ngModel" required>
                              <option value="" selected disabled>Scegli...</option>
                              <option *ngFor="let rep of this.filtriService.repartiGEV" value="{{rep.codice}}">{{rep.descrizione}}</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="cardForm" class="card">
                    <div class="card-body" style="padding: 0;">

                      <div class="row mb-3">
                        <div class="col-12">
                          <label>Prezzo d'acquisto *</label>

                          <div class="input-group">
                            <input type="number" class="form-control text-end" name="costo" [ngModel]="this.filtriService.GEVAttivo.costo | number : '1.2-2'" #costo="ngModel" required>
                            <span class="input-group-text" id="basic-addon2">€</span>
                          </div>
                        </div>

                      </div>

                      <div class="row mb-3">
                        <div class="col-12">
                          <label>Prezzo di vendita *</label>

                          <div class="input-group">
                            <input type="number" class="form-control text-end" name="price" [ngModel]="this.filtriService.GEVAttivo.prezzoVendita | number : '1.2-2'" #price="ngModel" required>
                            <span class="input-group-text" id="basic-addon2">€</span>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-12">
                          <label>UM</label>
                          <input type="text" class="form-control text-end" name="um" [ngModel]="this.filtriService.GEVAttivo.um | number : '1.2-2'">
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row mb-4">
                    <div [hidden]="h.valid" style="font-weight: 700; color: #b10000;">
                      I campi con l'asterisco (*) sono obbligatori
                    </div>
                  </div>

                  <div class="row mt-3">

                    <div class="col-4">
                      <button id="bottoneElimina" type="button" class="btn btn-primary w-100" (click)="this.filtriService.settaDeleteMobile()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                          <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                        </svg>
                      </button>
                    </div>

                    <div class="col-8">
                      <button id="bottoneSalva" type="submit" class="btn btn-primary w-100" (click)="editProdotto.emit(h)" [disabled]="h.invalid"> CONFERMA </button>
                    </div>

                  </div>
                </div>

              </div> <!-- contenuto tab-articolo - GEV -->

              <!-- Contenuto tab Barcodes - Tabacchi -->
              <div *ngIf="(this.filtriService.attivaView == 'barcode' && !this.filtriService.mostraGEV)">
                <div *ngIf="insNuovo">

                  <div class="container" style="padding: 0;">
                    <div class="row" style="margin: 1em 0 2em;">

                      <!-- Lista Barcodes -->
                      <div *ngIf="!this.filtriService.zeroBarcodes && !this.filtriService.editBcodeAttiva && !this.filtriService.addBcodeAttiva">

                        <div *ngFor="let bcF of this.filtriService.barcodesFiltrati">
                          <div id="cardListaBarcodes" class="card" (click)="settaEditBcode.emit(bcF)">
                            <div class="card-body" style="padding: 0.5em;">

                              <div class="row">
                                <div class="col-3" style="text-align: center;">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-upc" viewBox="0 0 16 16">
                                    <path d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"/>
                                  </svg>
                                </div>

                                <div class="col-9" style="margin-top: 0.4em;">
                                  {{bcF.codiceBarcode}}
                                </div>
                              </div>

                              <div class="row">
                                <div class="col-3" style="text-align: center;">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="35" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                                    <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                                  </svg>
                                </div>

                                <div class="col-9" style="margin-top: 0.4em;">
                                  {{bcF.pezziConfezione}}
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>

                        <div style="border: none; padding-top: 0; padding-bottom: 0; margin-top: 10em;">
                          <button id="bottoneAggiungi" type="submit" class="btn btn-light w-100" (click)="setAddBcode.emit()" *ngIf="!this.filtriService.addBcodeAttiva && !this.filtriService.editBcodeAttiva">AGGIUNGI</button>
                        </div>

                      </div>

                      <!-- FORM DI INSERIMENTO BARCODES -->
                      <div *ngIf="this.filtriService.addBcodeAttiva">

                        <div class="row" style="justify-content: center; margin-top: 1em; margin-bottom: 3em;">
                          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-folder-plus" viewBox="0 0 16 16">
                            <path d="m.5 3 .04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.683.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z"/>
                            <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 1 1 0 1H14v1.5a.5.5 0 1 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z"/>
                          </svg>
                        </div>

                        <div id="cardListaBarcodes" class="card">
                          <div class="card-body">

                            <form #j="ngForm">

                              <div class="row" style="margin-top: 1em; margin-bottom: 1em;">
                                <div class="input-group flex-nowrap">
                                  <span class="input-group-text" id="addon-wrapping" style="padding: 0.35em;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-upc" viewBox="0 0 16 16">
                                      <path d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"/>
                                    </svg>
                                  </span>

                                  <input type="text" class="form-control" name="bcode0" [ngModel] required style="background-color: #c1c1ff7a; border-top-left-radius: 10px; border-bottom-left-radius: 10px;">
                                </div>
                              </div>

                              <div class="row" style="margin-bottom: 2em;">
                                <div class="input-group flex-nowrap">
                                  <span class="input-group-text" id="addon-wrapping">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="35" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                                      <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                                    </svg>
                                  </span>

                                  <input type="number" class="form-control" name="pzxcf0" [ngModel] style="background-color: #c1c1ff7a; border-top-left-radius: 10px; border-bottom-left-radius: 10px;">
                                </div>
                              </div>

                              <div class="row" style="justify-content: space-evenly;">
                                <!-- Annulla -->
                                <button id="bottoneMini" type="button" class="btn btn-dark mb-1" (click)="cancelAddBcode.emit(j)">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                  </svg>
                                </button>

                                <!-- lancia addBarcode (componente home) -->
                                <button id="bottoneMini" type="button" class="btn btn-success ms-2 mb-1" (click)="addBarcode.emit(j)">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                  </svg>
                                </button>
                              </div>

                            </form>

                          </div>
                        </div>
                      </div>

                      <!-- FORM DI MODIFICA -->
                      <form #k="ngForm">
                        <div class="container" id="containerEdit">
                          <div id="cardListaBarcodes" class="card" *ngIf="!this.filtriService.zeroBarcodes && this.filtriService.editBcodeAttiva && !this.filtriService.delBcodeAttiva">
                            <div class="card-body">

                              <div class="row" style="margin-top: 4em; margin-bottom: 3em;">
                                <div class="col-8">
                                  <div class="input-group flex-nowrap">
                                    <span class="input-group-text" id="addon-wrapping">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-upc" viewBox="0 0 16 16">
                                        <path d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"/>
                                      </svg>
                                    </span>
                                    <input type="text" class="form-control" name="editBcode0" [(ngModel)]=editBcode0 style="background-color: #c1c1ff7a; border-top-left-radius: 10px; border-bottom-left-radius: 10px;">
                                  </div>
                                </div>

                                <div class="col-4">
                                  <div class="input-group flex-nowrap">
                                    <span class="input-group-text" id="addon-wrapping">
                                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="35" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                                        <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                                      </svg>
                                    </span>
                                    <input type="number" class="form-control text-end" name="editPezzi0" [(ngModel)]=editPezzi0 style="background-color: #c1c1ff7a; border-top-left-radius: 10px; border-bottom-left-radius: 10px;">
                                  </div>
                                </div>
                              </div>

                              <div class="row" style="justify-content: center;">
                                <!-- Annulla -->
                                <button id="bottoneMini" type="button" class="btn btn-dark mb-1" (click)="this.filtriService.annullaEditBcode()" >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                  </svg>
                                </button>
                                <!-- Cancella Barcode -->
                                <button id="bottoneMini" type="button" class="btn btn-danger ms-2 me-2 mb-1" (click)="this.filtriService.confermaDelete()">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                  </svg>
                                </button>
                                <!-- Conferma Modifica -->
                                <button id="bottoneMini" type="button" class="btn btn-success mb-1" (click)="editBarcodes.emit(k)">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                  </svg>
                                </button>
                              </div>

                            </div>
                          </div>

                          <!-- per conferma eliminazione -->
                          <div id="cardListaBarcodes" class="card" *ngIf="!this.filtriService.zeroBarcodes && this.filtriService.delBcodeAttiva">
                            <div class="card-body">

                              <div class="row" style="justify-content: center;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                </svg>
                              </div>

                              <!-- Conferma delete barcode -->
                              <div class="row mt-4 mb-4" style="text-align: center; font-size: 1.1rem;">
                                <div class="col-12">
                                  <p>Vuoi eliminare il barcode</p> <span style="font-weight: 700; ">{{this.filtriService.barcodeDaEliminare}}</span> ?
                                </div>
                              </div>

                              <div class="row" style="justify-content: center;">
                                <!-- Annulla -->
                                <button id="bottoneMini" type="button" class="btn btn-dark mb-1" (click)="this.filtriService.annullaDelete()">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                  </svg>
                                </button>

                                <!-- Conferma delete -->
                                <button id="bottoneMini" type="button" class="btn btn-success ms-2 mb-1" (click)="this.filtriService.delBarcode(this.filtriService.barcodeDaEliminare)">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                  </svg>
                                </button>
                              </div>

                            </div> <!-- card-body -->
                          </div>

                          <!-- Solamente per zero barcodes -->
                          <div id="cardListaBarcodes" class="card" *ngIf="this.filtriService.zeroBarcodes && !this.filtriService.addBcodeAttiva">
                            <div class="card-body">

                              <div class="row">
                                <div class="col-12" style="padding-left: 0.4em;">
                                  <p style="text-align: center;">Nessun barcode associato a questo articolo</p>
                                </div>
                              </div>

                              <div class="modal-footer" style="border: none; padding-top: 0; padding-bottom: 0;">
                                <button id="bottoneAggiungi" type="submit" class="btn btn-light w-100" (click)="setAddBcode.emit()" *ngIf="!this.filtriService.editBcodeAttiva">AGGIUNGI</button>
                              </div>

                            </div>
                          </div>
                        </div>
                      </form>

                    </div>
                  </div>

                </div> <!-- ngIf -->

                <!-- Modifica barcodes -->
                <div *ngIf="!insNuovo">

                  <div class="container" style="padding: 0;">
                    <div class="row" style="margin: 0;">

                      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor" class="bi bi-gear-wide-connected" viewBox="0 0 16 16" style="margin-top: 4em; margin-bottom: 3em;">
                        <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434l.071-.286zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5zm0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78h4.723zM5.048 3.967c-.03.021-.058.043-.087.065l.087-.065zm-.431.355A4.984 4.984 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8 4.617 4.322zm.344 7.646.087.065-.087-.065z"/>
                      </svg>

                      <!-- Lista Barcodes -->
                      <div *ngIf="!this.filtriService.zeroBarcodes && !this.filtriService.editBcodeAttiva && !this.filtriService.addBcodeAttiva" style="padding: 0;">
                        <div *ngFor="let bcF of this.filtriService.barcodesFiltrati">
                          <div id="cardListaBarcodes" class="card" (click)="settaEditBcode.emit(bcF)">
                            <div class="card-body" style="padding: 0.5em;">

                              <div class="row">
                                <div class="col-3" style="text-align: center;">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-upc" viewBox="0 0 16 16">
                                    <path d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"/>
                                  </svg>
                                </div>

                                <div class="col-9" style="margin-top: 0.4em;">
                                  {{bcF.codiceBarcode}}
                                </div>
                              </div>

                              <div class="row">
                                <div class="col-3" style="text-align: center;">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="35" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                                    <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                                  </svg>
                                </div>

                                <div class="col-9" style="margin-top: 0.4em;">
                                  {{bcF.pezziConfezione}}
                                </div>
                              </div>

                            </div>
                          </div>
                        </div>

                        <div class="modal-footer" style="border: none; padding: 0;">
                          <button id="bottoneAggiungi" type="submit" class="btn btn-light w-100" (click)="setAddBcode.emit()" *ngIf="!this.filtriService.addBcodeAttiva && !this.filtriService.editBcodeAttiva && !insNuovo">AGGIUNGI</button>
                        </div>
                      </div>

                      <!-- FORM DI INSERIMENTO BARCODES -->
                      <div id="cardListaBarcodes" class="card" *ngIf="this.filtriService.addBcodeAttiva">
                        <div class="card-body">

                          <form #j="ngForm">

                            <div class="row" style="margin-top: 1em; margin-bottom: 1em;">
                              <div class="input-group flex-nowrap">
                                <span class="input-group-text" id="addon-wrapping" style="padding: 0.35em;">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-upc" viewBox="0 0 16 16">
                                    <path d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"/>
                                  </svg>
                                </span>

                                <input type="text" class="form-control" name="bcode0" [ngModel] required style="background-color: #c1c1ff7a; border-top-left-radius: 10px; border-bottom-left-radius: 10px;">
                              </div>
                            </div>

                            <div class="row" style="margin-bottom: 2em;">
                              <div class="input-group flex-nowrap">
                                <span class="input-group-text" id="addon-wrapping">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="35" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                                    <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                                  </svg>
                                </span>

                                <input type="number" class="form-control text-end" name="pzxcf0" [ngModel] style="background-color: #c1c1ff7a; border-top-left-radius: 10px; border-bottom-left-radius: 10px;">
                              </div>
                            </div>

                            <div class="row" style="justify-content: center;">
                              <!-- Annulla -->
                              <button id="bottoneMini" type="button" class="btn btn-dark mb-1" (click)="cancelAddBcode.emit(j)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                </svg>
                              </button>

                              <!-- lancia addBarcode (componente home) -->
                              <button id="bottoneMini" type="button" class="btn btn-success ms-2 mb-1" (click)="addBarcode.emit(j)">
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                </svg>
                              </button>
                            </div>
                          </form>

                        </div>
                      </div>

                      <!-- FORM DI MODIFICA -->
                      <form #k="ngForm">
                        <div class="container" id="containerEdit">
                          <div id="cardListaBarcodes" class="card" *ngIf="!this.filtriService.zeroBarcodes && this.filtriService.editBcodeAttiva && !this.filtriService.delBcodeAttiva">
                            <div class="card-body">

                              Modifica barcode

                              <div class="row" style="margin-top: 1em; margin-bottom: 1em;">
                                <div class="input-group flex-nowrap">
                                  <span class="input-group-text" id="addon-wrapping" style="padding: 0.35em;">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" class="bi bi-upc" viewBox="0 0 16 16">
                                      <path d="M3 4.5a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7zm2 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-7zm3 0a.5.5 0 0 1 1 0v7a.5.5 0 0 1-1 0v-7z"/>
                                    </svg>
                                  </span>

                                  <input type="text" class="form-control" name="editBcode0" [(ngModel)]=editBcode0 style="background-color: #c1c1ff7a; border-top-left-radius: 10px; border-bottom-left-radius: 10px;">
                                </div>
                              </div>

                              <div class="row" style="margin-bottom: 2em;">
                                <div class="input-group flex-nowrap">
                                  <span class="input-group-text" id="addon-wrapping">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="35" fill="currentColor" class="bi bi-archive" viewBox="0 0 16 16">
                                      <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1v7.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 12.5V5a1 1 0 0 1-1-1V2zm2 3v7.5A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5V5H2zm13-3H1v2h14V2zM5 7.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                                    </svg>
                                  </span>

                                  <input type="number" class="form-control" name="editPezzi0" [(ngModel)]=editPezzi0 style="background-color: #c1c1ff7a; border-top-left-radius: 10px; border-bottom-left-radius: 10px;">
                                </div>
                              </div>

                              <div class="row" style="justify-content: space-evenly;">
                                <!-- Annulla -->
                                <button id="bottoneMini" type="button" class="btn btn-dark mb-1" (click)="this.filtriService.annullaEditBcode()" >
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                  </svg>
                                </button>
                                <!-- Cancella Barcode -->
                                <button id="bottoneMini" type="button" class="btn btn-danger ms-2 me-2 mb-1" (click)="this.filtriService.confermaDelete()">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                  </svg>
                                </button>
                                <!-- Conferma Modifica -->
                                <button id="bottoneMini" type="button" class="btn btn-success mb-1" (click)="editBarcodes.emit(k)">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                  </svg>
                                </button>
                              </div>

                            </div>
                          </div>

                          <!-- per conferma eliminazione -->
                          <div id="cardListaBarcodes" class="card" *ngIf="!this.filtriService.zeroBarcodes && this.filtriService.delBcodeAttiva">
                            <div class="card-body">

                              <div class="row" style="justify-content: center;">
                                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                                </svg>
                              </div>

                              <!-- Conferma delete barcode -->
                              <div class="row mt-4 mb-4" style="text-align: center; font-size: 1.1rem;">
                                <div class="col-12">
                                  <p>Vuoi eliminare il barcode</p> <span style="font-weight: 700; ">{{this.filtriService.barcodeDaEliminare}}</span> ?
                                </div>
                              </div>

                              <div class="row" style="justify-content: space-evenly;">
                                <!-- Annulla -->
                                <button id="bottoneMini" type="button" class="btn btn-dark mb-1" (click)="this.filtriService.annullaDelete()">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
                                  </svg>
                                </button>
                                <!-- Conferma delete -->
                                <button id="bottoneMini" type="button" class="btn btn-success ms-2 mb-1" (click)="this.filtriService.delBarcode(this.filtriService.barcodeDaEliminare)">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
                                  </svg>
                                </button>
                              </div>

                            </div>
                          </div>

                          <!-- Solamente per zero barcodes -->
                          <div id="cardListaBarcodes" class="card" *ngIf="this.filtriService.zeroBarcodes && !this.filtriService.addBcodeAttiva">
                            <div class="card-body">

                              <div class="row">
                                <div class="col-12" style="padding-left: 0.4em;">
                                  <p style="text-align: center;">Nessun barcode associato a questo articolo</p>
                                </div>
                              </div>

                              <div class="modal-footer" style="border: none; padding-top: 0; padding-bottom: 0;">
                                <button id="bottoneAggiungi" type="submit" class="btn btn-light w-100" (click)="setAddBcode.emit()" *ngIf="!this.filtriService.editBcodeAttiva && !insNuovo">AGGIUNGI</button>
                              </div>

                            </div>
                          </div>
                        </div> <!-- container -->
                      </form>

                    </div>
                  </div>
                </div> <!-- !insNuovo -->
              </div>

            </div> <!-- container -->

          </form>

        </div>

        </div> <!-- modal-body -->
      </div> <!-- modal-content -->
    </div> <!-- modal-dialog -->
  </div> <!-- modal-fade -->
  `,
  styles: [`
  .list-group-item {
    padding: 0 0.1em 0.1em 0.5em;
  }

  #cardReparto {
    margin-bottom: 0.5em;
    border: none;
  }

  #imgReparto {
    width: 46px;
    height: 46px;
  }

  #cardForm {
    border-radius: 20px;
    border: none;
  }

  #cardSelettore {
    border-radius: 40px;
    border: none;
    background-color: #efefef;
  }

  #containerEdit {
    padding: 0;
  }

  #cardListaBarcodes {
    margin-top: 1em;
    border-radius: 20px;
    margin-left: auto;
    margin-right: auto;
  }

  #cardModificaBarcodes {
    border-radius: 15px;
    border: none;
    margin: 3em auto 1em auto;
  }

  .nav-link {
    color: rgb(131 131 131);
    border-radius: 40px;
  }

  .nav-link.active {
    background: rgb(60 60 60 / 96%);
  }

  #closeModal {
    color: #ee3a23;
  }

  #bottoneSalva {
    height: 54px;
    border-radius: 10px;
    background-color: #343434;
    color: white;
    border: none;
    letter-spacing: 1.5px;
    font-weight: 700;
  }

  #bottoneSalva:hover {
    background: #08dd49;
  }

  #bottoneAggiungi {
    margin-top: 1em;
    margin-left: 0;
    margin-right: 0;
    height: 54px;
    background-color: #343434;
    border-radius: 20px;
    color: white;
    letter-spacing: 1.5px;
    font-weight: 700;
  }

  #bottoneAggiungi:hover {
    background: #6379ff;
  }

  #bottoneElimina {
    height: 54px;
    border-radius: 10px;
    background-color: #343434;
    color: white;
    border: none;
    letter-spacing: 1.5px;
    font-weight: 700;
  }

  #bottoneElimina:hover {
    background: rgb(251 65 65);
  }

  /* card che wrappa tutta la modal */
  .modal-content {
    border-radius: 20px;
    min-height: 100vh; /* per le finestre della modal che sono troppo piccole e lasciano spazio nero sotto */
  }

  /* scheda articolo */
  #basic-addon1{
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  #basic-addon2{
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  /* colore sfondo dei basic-addons */
  .input-group-text {
    background-color: #3838380f;
  }

  .form-control, .form-select {
    border-radius: 10px;
    background-color: white;
  }

  .form-control:disabled {
    background-color: #3838380f;
  }

  #addon-wrapping {
    border: 1px solid #ced4da00;
    background-color: #e9ecef00;
  }

  #bottoneMini {
    width: 70px;
    height: 45px;
    border-radius: 10px;
  }

  /* Elemento singolo lista barcodes */
  #barcodeFor {
    background: rgba( 255, 255, 255, 0.6 );
    box-shadow: 0 0 1px 0 rgba( 0, 0, 0, 0.37 );
    border-radius: 5px;
  }

  /* Validazione form */
  .form-control.ng-invalid.ng-touched, .form-select.ng-invalid.ng-touched {
    border: 1px solid red;
  }

  .animate__animated.animate__fadeIn {
    --animate-delay: 1s;
    --animate-duration: 3s;
  }
  `
  ]
})
export class ModalMobileComponent {

  constructor( public filtriService: FiltriService ) { }

  @Input() insNuovo: boolean = false;
  @Input() editBcode0: string = '';
  @Input() editPezzi0: number = 0;
  @Output() editBarcodes: EventEmitter<any> = new EventEmitter<any>();
  @Output() settaEditBcode: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeEditPopup: EventEmitter<NgForm> = new EventEmitter<NgForm>();
  @Output() editProdotto: EventEmitter<NgForm> = new EventEmitter<NgForm>();
  @Output() addBarcode: EventEmitter<NgForm> = new EventEmitter<NgForm>();
  @Output() cancelAddBcode: EventEmitter<any> = new EventEmitter<any>();
  @Output() setAddBcode: EventEmitter<any> = new EventEmitter<any>();
  @Output() delProdotto: EventEmitter<Partial<Tabacchi>> = new EventEmitter<Partial<Tabacchi>>();
  @Output() delGEV: EventEmitter<Partial<Gev>> = new EventEmitter<Partial<Gev>>();

}
