import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-header-mobile',
  template: `
  <div id="wrapperHeader">

    <div>&nbsp;</div>

    <div class="container">
      <div class="row">
        <div class="col-10" style="color: #9f9f9f;">
          Benvenuto, <span style="color: #343434;">{{authService.getUser()}}</span>
        </div>

        <div class="col-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16" routerLink="" (click)="this.authService.logoff()">
            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
          </svg>
        </div>
      </div>
    </div>

  </div>
  `,
  styles: [`
  `
  ]
})
export class HeaderMobileComponent {

  constructor( public authService: AuthService) { }

}
