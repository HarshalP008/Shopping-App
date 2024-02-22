import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})

export class CartServiceService {
  cartDataList:any= [];// initially no items in cart.
  mySubject$= new BehaviorSubject<any>([]);
  cartItemsQty$ = new BehaviorSubject<any>(0);
  // behaviorSubject recieves value and also emmit/send here empty array value set as Initial value([]).
  
  constructor(private toastService : ToastService){}

  getProductData(){
    return this.mySubject$.asObservable();
  }

  getCartItems(){
    return this.cartItemsQty$.asObservable();
  }
  
  setProduct(product:any){
    this.cartDataList.push(product); // Items added in cart.
    this.mySubject$.next(this.cartDataList); // updated cartDataList send as observable.
  }

  addItemInCart(product:any){
    // let id= product.id;
    let index = this.cartDataList.findIndex((res: { id: any}) => res.id == product.id);
      if(index === -1){
        this.cartDataList.push(product);
      }else{
        this.cartDataList[index].productQuantity= product.productQuantity;
      }
    this.mySubject$.next(this.cartDataList);// updated cartDataList send as observable.
    this.getTotalCartItemsQty();

    // Show toast Notification
    this.toastService.show(`Item Added to cart (${product.productName} Qty= ${product.productQuantity})`, { classname: 'bg-success text-light mt-4', delay: 4000, autohide: true});
    
    localStorage.setItem("cartItems",JSON.stringify(this.cartDataList));// Save cartdata in localstorage
  }

  removeItem(product:any){
    this.cartDataList.map((a:any, index:any)=>{
      if(product.id ===a.id){
        this.cartDataList.splice(index,1);
      }
      this.getTotalCartItemsQty();
    })
    
    this.toastService.show(`Item Removed (${product.productName} Qty= ${product.productQuantity})`,
    { classname: 'bg-danger text-light mt-4', delay: 4000, autohide: true});
  }
  
  getTotalAmount(){
    let grandTotal=0;
    this.cartDataList.map((a:any)=>{
      grandTotal += (a.productQuantity*a.productPrice);
    })
    return grandTotal;
  }

  getTotalCartItemsQty(){
    let totalCartItems:number = 0;
    this.cartDataList.map((a:any)=>{
      totalCartItems += (a.productQuantity);
      console.log(totalCartItems);
      
    })
    this.cartItemsQty$.next(totalCartItems);
  }
}
