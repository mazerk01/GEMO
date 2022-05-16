import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { AuthInterceptor } from './core/http.interceptor';
import { TableProdottiComponent } from './features/table-prodotti/table-prodotti.component';
import { ModalEditComponent } from './features/modals/modal-edit/modal-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpErrorInterceptor } from './core/httperror.interceptor';
import { SearchFilterPipe } from './features/table-prodotti/search-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { SortDirective } from './features/table-prodotti/sort.directive';
import { WidgetRepartiComponent } from './features/widget-reparti/widget-reparti.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HomeMobileComponent } from './features/home/home-mobile.component';
import { HeaderMobileComponent } from './features/mobile/header-mobile.component';
import { HeaderBodyComponent } from './features/mobile/body-mobile.component';
import { MenuMobileComponent } from './features/mobile/menu-mobile.component';
import { ModalMobileComponent } from './features/mobile/modal-mobile.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    TableProdottiComponent,
    ModalEditComponent,
    SearchFilterPipe,
    SortDirective,
    WidgetRepartiComponent,
    NavbarComponent,
    HomeMobileComponent,
    HeaderMobileComponent,
    HeaderBodyComponent,
    MenuMobileComponent,
    ModalMobileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    NgxPaginationModule,
    TooltipModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
