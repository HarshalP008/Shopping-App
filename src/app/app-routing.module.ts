import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { RestrictedComponent } from './restricted/restricted.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './home/header/header.component';
import { ChildOneComponent } from './home/child-one/child-one.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AuthGuard } from './auth.guard';
import { ClientListComponent } from './client-list/client-list.component';
import { ClientBillsComponent } from './client-bills/client-bills.component';

const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:'login', component:LoginComponent},
  {path:"home", component:HomeComponent, children:[
    {path:"app-header", component:HeaderComponent},
    {path:"childOne", component:ChildOneComponent}
  ]},
  {path:"clientList", canActivate:[AuthGuard], component:ClientListComponent},
  {path:"client-bills", canActivate:[AuthGuard], component:ClientBillsComponent},
  {path:"shop-cart", component:ShopCartComponent},
  {path:"pageNotFound", component:PagenotfoundComponent},
  {path:"restricted", component:RestrictedComponent},
  {path:"**", redirectTo:"pageNotFound"},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
