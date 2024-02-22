import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { CartServiceService } from 'src/app/shared/cart-service.service';
import { LoginService } from 'src/app/shared/login.service';
import { NgbToast, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/shared/toast.service';

@Component({
  selector: 'app-child-one',
  templateUrl: './child-one.component.html',
  styleUrls: ['./child-one.component.css']
})

export class ChildOneComponent implements OnInit, OnDestroy {

  public productList:any= [];
  private unsubscribe$= new Subject<void>();
  //for offline data- without API/Firebase
  public viewAll: Boolean = false;
  public heroImages = [
    {
      "image":"../../assets/images/mega-sale-banner.avif",
    },
    {
      "image":"../../assets/images/watercolor-autumn-banner.jpg",
    },
    {
      "image":"../../assets/images/freshVegitables.jpg",
    },
    {
      "image":"../../assets/images/mega-sale-end-of-season-banner.png",
    },
  ];
  
  constructor(private httpServ: ApiService, private router: Router, private cartServ: CartServiceService, private loginserv: LoginService,
  private _renderer: Renderer2, private _elementRef: ElementRef){}
  
  ngOnInit(): void {
    this.getProductList();
  }
    //Get data Using API call/Firebase
  //   getProductList(){
  //   this.httpServ.getProducts().pipe(takeUntil(this.unsubscribe$)).subscribe((data : any)=>{
  //     this.productList = data;//firebase database object not having quantity so quantity added and set it by default=1
  //     this.productList.forEach((a:any)=>{
  //       Object.assign(a,{productQuantity:0});
  //       console.log(this.productList);
  //     })
  //   })
  // }
  
  // Without using API data( offline static Items)
  getProductList(){
    this.httpServ.getAllProdData().pipe(takeUntil(this.unsubscribe$)).subscribe((data : any)=>{
      this.productList = data;
      this.productList.forEach((a:any)=>{
        Object.assign(a,{productQuantity:0});
        console.log(this.productList);
      })
    })
  }

  
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  incQty(item:any){
    //item.productQuantity +=1; gives string value =01 011
    item.productQuantity++;
  }

  decQty(item:any){
    if(item.productQuantity > 0){
      item.productQuantity--;     
    }
  }

  addToBag(item:any){
    if(item.productQuantity>=1){
      this.cartServ.addItemInCart({...item});
      item.productQuantity=0;//reset
    }else{}
    console.log({...item});
  }

  goToCart(){
    this.router.navigate(["/shop-cart"]);
  }
  
  logOut(){
    this.loginserv.logOut();
    this.router.navigate(['/login']);
  }
  viewAllProducts() {
    this.viewAll = true;
  }
  viewLess(){
    this.viewAll = false;
  }
  toggleView() {
    this.viewAll = ! this.viewAll;
    }
}


