import { Component } from '@angular/core';
import { FiltriService } from 'src/app/core/filtri.service';

@Component({
  selector: 'app-widget-reparti',
  template: `
  <div class="container" style="max-width: 100%">
    <div id="wrapRow" class="row">

      <div class="col-2">

        <!-- Selettore categoria (Tabacchi / Gratta & Vinci) -->
        <div id="bottoneCategoria">

          <div id="cardReparto" class="card" *ngIf="!this.filtriService.mostraGEV">
            <div class="card-body">
              <img id="imgCategoria" class="animate__animated" [class.animate__flipInY]="!this.filtriService.mostraGEV" src="./assets/images/widgetFiltri/tabacchi.jpg" (click)="this.filtriService.switchCategoria()" tooltip="Tabacchi" placement="top" [options]="tooltipOptions">
            </div>
          </div>

          <div id="cardReparto" class="card" *ngIf="this.filtriService.mostraGEV">
            <div class="card-body">
              <img id="imgCategoria" class="animate__animated" [class.animate__flipInY]="this.filtriService.mostraGEV" src="./assets/images/widgetFiltri/gratta.jpg" (click)="this.filtriService.switchCategoria()" tooltip="Gratta & Vinci" placement="top" [options]="tooltipOptions">
            </div>
          </div>

        </div>
      </div>

      <!-- Lista reparti (Tabacchi) -->
      <div class="col-10" style="display: flex; justify-content: flex-end;">
        <div *ngIf="!this.filtriService.mostraGEV" style="display: flex; justify-content: center;">
          <div class="animate__animated animate__fadeInRight" style="display: flex;">
            <div id="cardReparto" class="card">
              <div class="card-body">
                <div id="bottoneReparto" [ngStyle]="{'filter' : this.filtriService.cercaReparto == 'All' ? 'none' : 'saturate(0)'}" (click)="this.filtriService.settaTutti()">
                  <img id="imgReparto" src="./assets/images/widgetFiltri/all.jpg" tooltip="Tutti" placement="top" [options]="tooltipOptions">
                </div>
              </div>
            </div>

            <div *ngFor="let repartoTabacchi of this.filtriService.repartiTabacchi">
              <div id="cardReparto" class="card">
                <div class="card-body">
                  <div id="bottoneReparto" [ngStyle]="{'filter' : this.filtriService.cercaReparto == repartoTabacchi.codice ? 'none' : 'saturate(0)'}" (click)="this.filtriService.settaReparto(repartoTabacchi)">
                    <img id="imgReparto" src="./assets/images/widgetFiltri/{{repartoTabacchi.codice}}.jpg" tooltip="{{repartoTabacchi.descrizione}}" placement="top" [options]="tooltipOptions">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Lista reparti (GRATTA E VINCI) -->
        <div *ngIf="this.filtriService.mostraGEV" style="display: flex; justify-content: center;">
          <div class="animate__animated animate__fadeInLeft" style="display: flex;">
            <div id="cardReparto" class="card">
              <div class="card-body">
                <!-- Tutti i Reparti -->
                <div id="bottoneReparto" [ngStyle]="{'filter' : this.filtriService.cercaReparto == 'All' ? 'none' : 'saturate(0)'}" (click)="this.filtriService.settaTutti()">
                  <img id="imgReparto" src="./assets/images/widgetFiltri/all.jpg" tooltip="Tutti" placement="top" [options]="tooltipOptions">
                </div>
              </div>
            </div>

            <div *ngFor="let repartoGEV of this.filtriService.repartiGEV">
              <div id="cardReparto" class="card">
                <div class="card-body">
                  <div id="bottoneReparto" [ngStyle]="{'filter' : this.filtriService.cercaReparto == repartoGEV.codice ? 'none' : 'saturate(0)'}" (click)="this.filtriService.settaReparto(repartoGEV)">
                    <img id="imgReparto" src="./assets/images/widgetFiltri/{{repartoGEV.codice}}.jpg" tooltip="{{repartoGEV.descrizione}}" placement="top" [options]="tooltipOptions">
                  </div>
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
  #wrapRow {
    margin-left: 4em;
    margin-right: 4em;
  }

  #bottoneCategoria {
    display: flex;
    border: none;
    border-radius: 30px;
  }

  #imgCategoria {
    cursor: pointer;
    width: 65px;
    height: 65px;
  }

  .animate__animated.animate__flipInY {
    --animate-delay: 0.9s;
    --animate-duration: 1.8s;
  }

  #cardReparto {
    margin: 6em 1em 2em;
    border-radius: 20px;
  }

  #bottoneReparto {
    cursor: pointer;
    width: fit-content;
    background: rgba(0, 0, 0, 0);
    border: none;
    border-radius: 30px;
  }

  #imgReparto {
    width: 65px;
    height: 65px;
  }

  .animate__animated.animate__fadeInLeft {
    --animate-delay: 3s;
    --animate-duration: 2s;
  }

  .animate__animated.animate__fadeInRight {
    --animate-delay: 3s;
    --animate-duration: 2s;
  }

  /* laptop extra-piccoli */
  @media all and (min-width: 769px) and (max-width: 899px) {
    .container {
      max-width: fit-content;
    }

    #imgReparto, #imgCategoria {
      width: 30px;
      height: 30px;
    }

    #cardReparto {
      margin: 3em 0.5em 2em;
    }

    #wrapRow {
      margin-left: 0;
      margin-right: 0;
    }
  }

  /* laptop piccoli */
  @media all and (min-width: 900px) and (max-width: 919px) {
    .container {
      max-width: fit-content !important;
    }

    #imgReparto, #imgCategoria {
      width: 30px;
      height: 30px;
    }

    #cardReparto {
      margin: 3em 0.5em 2em;
    }

    #wrapRow {
      margin-left: 0;
      margin-right: 0;
    }
  }

  /* laptop piccoli */
  @media all and (min-width: 920px) and (max-width: 1024px) {
    .container {
      max-width: 90% !important;
    }

    #imgReparto, #imgCategoria {
      width: 30px;
      height: 30px;
    }

    #cardReparto {
      margin: 3em 0.5em 2em;
    }

    #wrapRow {
      margin-left: 0;
      margin-right: 0;
    }
  }

  /* laptop */
  @media all and (min-width: 1025px) and (max-width: 1439px) {
    .container {
      max-width: 99% !important;
    }

    #imgReparto, #imgCategoria {
      width: 35px;
      height: 35px;
    }

    #cardReparto {
      margin: 6em 0.5em 2em;
    }
  }
  `
  ]
})
export class WidgetRepartiComponent  {

  constructor( public filtriService: FiltriService) { }

  tooltipOptions = {
    'showDelay': 0,
    'hideDelay': 100
  }

}
