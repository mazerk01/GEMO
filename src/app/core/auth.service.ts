import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Login } from "./login.model";

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor( private router: Router, private httpClient: HttpClient, public toastr: ToastrService) {}

  utente: Partial<Login> = { };

  // Recupera nome utente
  getUser() {
    return localStorage.getItem('username');
  }

  // Recupera token dal local Storage
  getToken() {
    return localStorage.getItem('token');
  }

  // Cancella token dal local Storage
  deleteToken() {
    localStorage.removeItem('token');
  }

  // Verifica autenticazione
  isAuth() {
    if (this.getToken())
      return true;
    else
      return false;
  }

  // Toast login-fail
  showLoginFail() {
    this.toastr.error('Credenziali errate');
  }

  // Login
  doLogin(f: NgForm) {
    const url = 'https://gabservizi.it/api-tabacchi/api/Login';

    return this.httpClient.post<Login>(url, {username: f.value.username, password: f.value.password }).subscribe( utente => {
      if (utente.token) {
        this.utente = utente;
        localStorage.setItem("username", (utente.userName as string));
        localStorage.setItem("token", utente.token);
        localStorage.setItem("expires", utente.validaty);
        this.router.navigateByUrl('home');
      }
      else {
        this.showLoginFail();
        f.reset();
      }
    })
  };

  // Logout
  logoff() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('expires');
  }
}
