import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Login } from 'src/app/core/login.model';

@Component({
  selector: 'app-login',
  template: `
  <div id="wrapBody">

    <div>
      &nbsp;
    </div>

    <div id="contenitoreLogin">
      <div class="container" style="max-width: 100%;">
        <div class="row" style="position: relative; width: 800px;">
          <img id="imgLogin" src="./assets/images/sfondi/rocketwoman.png">
        </div>

        <div class="row">
          <div class="container-fluid">

            <div class="row">
              <!-- Login -->
              <div class="col-12">

                <!-- Form login -->
                <div id="divForm" class="row">
                  <form #f="ngForm" id="loginForm" class="rounded rounded-1">

                    <p class="fw-bold">GEMO</p>

                    <div class="input-group mb-2" style="margin-top: 2em;">
                      <input type="text" class="form-control" placeholder="Username" name="username" [ngModel]>
                    </div>

                    <div class="input-group">
                      <input type="password" class="form-control" placeholder="Password" name="password" [ngModel]>
                    </div>

                    <button id="loginButton" class="btn btn-dark" (click)="this.authService.doLogin(f)">ACCEDI</button>
                  </form>
                </div>
              </div>
            </div>
          </div> <!-- container -->
        </div>

      </div>
    </div>
  </div>
  `,
  styles: [`
  #wrapBody {
    width: 100%;
    height: 100vh;
    background-image: url('src/assets/images/sfondi/balls.jpg');
  }

  /* Scritta welcome */
  .fw-bold {
    color: #ff8100;
    letter-spacing: 2px;
    text-shadow: 0px 1px 3px black;
    font-size: 4rem;
    margin-top: 1em;
    margin-bottom: 0;
  }

  #contenitoreLogin {
    width: 25%;
    margin: auto;
    margin-top: 11em;
    border-radius: 40px;
    box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
    backdrop-filter: blur(16px) saturate(140%);
    -webkit-backdrop-filter: blur(16px) saturate(140%);
    background-color: rgba(255, 255, 255, 0.55);
    border: 1px solid rgba(255, 255, 255, 0.125);
  }

  #imgLogin {
    position: absolute;
    top: -181px;
    left: -255px;
  }

  /* Form Login */
  #loginForm {
    text-align: center;
    border: none;
    margin-top: 16em;
  }

  #iconaLogin {
    width: 64px;
  }

  .input-group {
    margin: 0 auto 0 auto;
    width: 55%;
    height: 50px;
  }

  .form-control {
    border-radius: 40px;
    padding-left: 1.5em;
    padding-right: 1.5em;
    border: 1px solid #ced4da5c;
  }

  #loginButton {
    margin-top: 2em;
    margin-bottom: 2em;
    width: 54%;
    height: 50px;
    border-radius: 40px;
    border: none;
    font-weight: 700;
    letter-spacing: 1px;
    background: rgb(252,144,49);
    background: linear-gradient(180deg, rgba(252,144,49,1) 0%, rgba(255,91,15,1) 100%);
  }

  /* laptop piccoli */
  @media all and (min-width: 769px) and (max-width: 1024px) {
    #contenitoreLogin {
      width: 50%;
    }

    #imgLogin {
      display: none;
    }

    #loginForm {
      margin-top: 2em;
    }

    .fw-bold {
      margin-top: 0;
      margin-bottom: 1em;
    }
  }

  /* laptop */
  @media all and (min-width: 1025px) and (max-width: 1439px) {
    #contenitoreLogin {
      width: 35%;
    }

    #imgLogin {
      width: 35em;
      height: auto;
      top: -147px;
      left: -88px;
    }

    #loginForm {
      margin-top: 10em;
    }
  }

  /* desktop piccoli */
  @media all and (min-width: 1440px) and (max-width: 1883px) {
    #imgLogin {
      top: -215px;
    }

    #loginForm {
      margin-top: 13em;
    }
  }
  `
  ]
})
export class LoginComponent {
  user : Partial<Login> = {};

  constructor( public authService: AuthService ) { }

}
