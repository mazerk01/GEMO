import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { catchError, map, Observable, throwError } from "rxjs";
import { FiltriService } from "./filtri.service";
import { NotificheService } from "./notifiche.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor( public toastr: ToastrService, public notificheService: NotificheService, public filtriService: FiltriService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(res => {
        // Visualizza i Toastr di successo
        if (req.method == 'POST' && res.type == 4) {
          // check se login o se si sta inserendo un prodotto/barcode
          if (req.url == 'https://gabservizi.it/api-tabacchi/api/Login') this.toastr.success('Benvenuto')
            else {
              if (req.url == 'https://gabservizi.it/api-tabacchi/api/barcode') this.toastr.success(`Barcode inserito`)
              else {
                this.toastr.success(`${this.notificheService.getDescrizione()} inserito`);
                this.filtriService.inserimentoOk = true;
              }
            }
        }
        // check per la modifica del prodotto
        if (req.method == 'PUT' && res.type == 4) {
          this.toastr.success(`Articolo modificato`)
        }
        // check per delete prodotto/barcode
        if (req.method == 'DELETE' && res.type == 4) {
          if (res.url?.includes('barcode')) this.toastr.success(`Barcode ${this.notificheService.getBarcode()} rimosso`)
          else this.toastr.success(`${this.notificheService.getDescrizione()} rimosso`)
        }
        return res
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Client Error: ${error.error.message}`;
        } else {
          errorMsg = `Server Error code: ${error.status}, Message: ${error.message}`;
        }
        console.log(errorMsg);
        // Autorizzazioni insufficienti
        if (error.status == 403) this.toastr.error('Autorizzazioni insufficienti')
        // Login - credenziali mancanti
        if (error.status == 400 && error.message.includes('Login')) this.toastr.warning('Inserire Credenziali')
        // Login - Credenziali errate
        if (error.status == 404 && error.message.includes('Login')) this.toastr.error('Credenziali errate')
        // POST Prodotto: dati duplicati o mancanti
        if (error.status == 500) {
          if (error.error.messaggio.includes('Duplicate')) this.toastr.error(`Articolo già esistente`)
            else this.toastr.error('Mancano campi obbligatori')
        }
        // Modifica
        if (req.method == 'PUT') this.toastr.error('Modifica fallita')
        // Eliminazione fallita
        if (req.method == 'DELETE') this.toastr.error('Eliminazione fallita')
        return throwError(() => new Error(errorMsg));
      })
    )
  }
}
