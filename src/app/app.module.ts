import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShopCartComponent } from './shop-cart/shop-cart.component';
import { RestrictedComponent } from './restricted/restricted.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ChildOneComponent } from './home/child-one/child-one.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ClientListComponent } from './client-list/client-list.component';
import { FooterComponent } from './home/footer/footer.component';
import { NgbAccordionModule, NgbCarousel, NgbCarouselModule, NgbDropdown, NgbDropdownModule, NgbDropdownToggle, NgbModal, NgbModalModule, NgbModule, NgbToastModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from './toast/toast.component';
import { ClientBillsComponent } from './client-bills/client-bills.component';
import { CommonModule } from '@angular/common';
import { UserService } from './shared/user.service';
import { CartServiceService } from './shared/cart-service.service';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChildOneComponent,
    ShopCartComponent,
    RestrictedComponent,
    LoginComponent,
    HomeComponent,
    PagenotfoundComponent,
    ClientListComponent,
    FooterComponent,
    ToastComponent,
    ClientBillsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgbModalModule,
    NgbCarouselModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbAccordionModule,
    NgbToastModule,
    CommonModule,
  ],
  providers: [NgbModal, NgbCarousel,NgbDropdown, NgbDropdownToggle,UserService,CartServiceService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
