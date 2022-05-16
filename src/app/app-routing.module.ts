import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeMobileComponent } from './features/home/home-mobile.component';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: window.screen.width > 767 ? HomeComponent : HomeMobileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
