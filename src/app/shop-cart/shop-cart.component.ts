import { Component, OnInit } from '@angular/core';
import { CartServiceService } from '../shared/cart-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.css']
})
export class ShopCartComponent implements OnInit {
  cartProduct: any[] =[];
  public grandTotal:number =0;
  isItemSelected:boolean = false;
  selectedItem !: any;

  constructor(private cartServ: CartServiceService , private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.getCartItems();
  }
  getCartItems(){
    this.cartServ.getProductData().subscribe(res=>{
      this.cartProduct= res;
      this.grandTotal= this.cartServ.getTotalAmount();
      console.log(this.cartProduct);
    });
  }
  removeProduct(item:any){
    this.cartServ.removeItem(item);
    this.grandTotal= this.cartServ.getTotalAmount();
  }
  selectItem(selItem:any){ 
    this.isItemSelected = true;
    this.selectedItem= selItem;
    console.log(selItem);
  }
}