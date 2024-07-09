import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { NgbModal, NgbOffcanvas} from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs'; // for use Api service and firebase data.
import { ApiService } from 'src/app/shared/api.service';
import { CartServiceService } from 'src/app/shared/cart-service.service';
import { LoginService } from 'src/app/shared/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  public myForm : FormGroup | any;
  public productList:any[]= [];
  public cartDataList:any= [];
  public loggedInUser: any ='';
  public openModaldia: boolean = false;
  public totalItemsInCart: any = 0;
  searchProduct: any = '';
  
 constructor(private httpServ: ApiService, private cartServ:CartServiceService, private loginServ: LoginService,
  private modalService: NgbModal, private offcanvasService: NgbOffcanvas) {}
  
  ngOnInit(): void {
    this.myForm = new FormGroup({
      productImage: new FormControl('',Validators.required),
      productName: new FormControl('',Validators.required),
      productPrice: new FormControl('',Validators.required),
      //productQuantity: new FormControl('0') // by default set Pqty to=0
    })
    this.cartDataList=this.cartServ.cartDataList;//for updating item numbers in cart and show no. of items in cart
    this.loggedInUser = this.loginServ.loggedInUserDet();
    this.itemsInCart();
  }
  onSubmit(){
    // this.httpServ.postNewProduct(this.myForm.value).pipe(takeUntil(this.unsubscribe$)).subscribe((data : any)=>{
    //   console.log("new Product submitted",data);
    //   this.myForm.reset();
    // })
    
  this.productList.push(this.myForm.value);//without using Api/firebase
  console.log(this.productList);
  alert('New Product Added in Products List');
  this.myForm.reset();
  }

  formModalClose(){
    this.myForm.reset();
    this.modalService.dismissAll();
  }
  searchProd(){
    console.log(this.searchProduct);
    this.httpServ.getProd(this.searchProduct);
  }

  //ngBootstrap components  
  openSm(content:any) {
		this.modalService.open(content, { size: 'md' });
	}
  
  openSidebar(sideBarContent:any){
		this.offcanvasService.open(sideBarContent);
  }
  itemsInCart(){
    this.cartServ.getCartItems().subscribe((res:any) => {
      this.totalItemsInCart= res;
      console.log(this.totalItemsInCart);
      });
  }
}
// Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])