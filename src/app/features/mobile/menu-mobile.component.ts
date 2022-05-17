import { Component } from '@angular/core';
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

            <div id="tastoMenu" class="card">
              <div class="card-body">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#b5b9ff" class="bi bi-plus-lg" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                </svg>
              </div>
            </div>

            <div id="tastoMenu" class="card">
              <div class="card-body">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#b5b9ff" class="bi bi-funnel" viewBox="0 0 16 16">
                  <path d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"/>
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


}
