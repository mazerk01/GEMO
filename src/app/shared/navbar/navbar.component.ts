import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { FiltriService } from 'src/app/core/filtri.service';

@Component({
  selector: 'app-navbar',
  template: `
  <nav class="navbar navbar-light">
    <div class="container" style="max-width: 92%; justify-content: center; margin-top: 1em;">
      <div class="row" style="width: 100%;">

        <div class="col-4">
          <div id="navbarTitle">GEMO</div>
        </div>

        <div class="col-4"></div>

        <div class="col-4">
          <nav class="navbar navbar-expand navbar-light" style="padding: 0;">
            <div class="collapse navbar-collapse" style="justify-content: flex-end; margin-top: 1em;">
              <ul class="navbar-nav">
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style="padding: 0;">
                    <div>
                      Benvenuto, <span style="color: white;">{{authService.getUser()}} &nbsp;</span>

                      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                      </svg>
                    </div>
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <a class="dropdown-item" routerLink="home">Settings</a>
                    </li>
                    <li>
                      <a class="dropdown-item" routerLink="" (click)="this.authService.logoff()">Logout</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </div>

      </div>
    </div>
  </nav>
  `,
  styles: [`
  #navbarTitle {
    color: white;
    text-shadow: 1px 1px 0 black;
    font-family: 'Staatliches', cursive;
    font-size: 3.5em;
    font-weight: 700;
  }

  #navbarDropdown {
    font-size: 1.2em;
  }

  /* Per nascondere la freccia della dropdown */
  .dropdown-toggle::after {
    display: none;
  }

  /* img Utente Hover */
  @media all and (min-width: 992px) {
    .navbar .nav-item .dropdown-menu { display: none; }
    .navbar .nav-item:hover .dropdown-menu { display: block; }
    .navbar .nav-item .dropdown-menu { margin-top: 0; }
  }

  /* laptop extra-piccoli */
  @media all and (min-width: 769px) and (max-width: 899px) {
    .container {
      max-width: 98% !important;
    }
  }

  /* laptop piccoli */
  @media all and (min-width: 900px) and (max-width: 1024px) {
    .container {
      max-width: 87% !important;
    }
  }

  /* laptop */
  @media all and (min-width: 1025px) and (max-width: 1245px) {
    .container {
      max-width: 85% !important;
    }
  }

  /* laptop */
  @media all and (min-width: 1246px) and (max-width: 1439px) {
    .container {
      max-width: 88% !important;
    }
  }

  /* desktop piccoli */
  @media all and (min-width: 1440px) and (max-width: 1679px) {
    .container {
      max-width: 89% !important;
    }
  }
  `
  ]
})
export class NavbarComponent {

  constructor( public authService: AuthService, public filtriService: FiltriService) { }

}
