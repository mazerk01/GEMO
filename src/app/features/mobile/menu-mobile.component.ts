import { Component, EventEmitter, Output } from '@angular/core';
import { FiltriService } from 'src/app/core/filtri.service';

@Component({
  selector: 'app-menu-mobile',
  template: `
    <div id="wrapperMenu" class="card">
      <div class="card-body">
        <div class="container">
          <div class="row" style="justify-content: space-between;">

            <div id="tastoMenu" class="card" (click)="this.filtriService.switchCategoria()">
              <div class="card-body">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="red" class="bi bi-triangle" viewBox="0 0 16 16">
                  <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/>
                </svg>
              </div>
            </div>

            <div id="tastoMenu" class="card" data-bs-target="#modalMobile" data-bs-toggle="modal" (click)="this.filtriService.settaModalReparti()">
              <div class="card-body">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#b5b9ff" class="bi bi-funnel" viewBox="0 0 16 16">
                  <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
                </svg>
              </div>
            </div>

            <div id="tastoMenu" class="card" data-bs-target="#modalMobile" data-bs-toggle="modal" (click)="openAddPopup.emit()">
              <div class="card-body">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#b5b9ff" class="bi bi-plus-lg" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>
              </div>
            </div>

            <div id="tastoMenu" class="card">
              <div class="card-body">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#b5b9ff" class="bi bi-gear" viewBox="0 0 16 16">
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
  }

  #tastoMenu {
    width: 3.5em;
    text-align: center;
    border: none;
  }

  #tastoMenu .card-body {
    padding-left: 0;
    padding-right: 0;
  }
  `
  ]
})
export class MenuMobileComponent {

  constructor( public filtriService: FiltriService) { }

  @Output() openAddPopup: EventEmitter<any> = new EventEmitter<any>();


}
