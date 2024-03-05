import { Injectable } from '@angular/core';
import { BehaviorSubject, map} from 'rxjs';
import{ HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //for use of API for dataList
  static DatabaseUrl = "https://dummyproductlist-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"; 
  
  // for offline product List
  allProducts: any= [];
  filteredList: any =[];
  allProducts$ = new BehaviorSubject<any>([]);
  dummyProducts =[
    {
        "productImage": "../../assets/images/images-bag.jpg",
        "productName": "Bag-01",
        "productPrice": "1200",
        "id": "-NNGs8X9znZ4sg9vStQI",        
    },
    {
        "productImage": "../../assets/images/image-4.png",
        "productName": "Bag-02",
        "productPrice": "100",
        "id": "-NNGu8j0Ssq2J0hewAy5",        
    },
    {
        "productImage": "../../assets/images/camera.png",
        "productName": "Camera-01",
        "productPrice": "800",
        "id": "-NNH-mJN2k_zMy92dufj",        
    },
    {
        "productImage": "../../assets/images/Laptop-image.webp",
        "productName": "Laptop-01",
        "productPrice": "1000",
        "id": "-NNHAGkl2aY_grcVygMO",
    },
    {
        "productImage": "../../assets/images/Mobile-01.jpg",
        "productName": "Mobile-01",
        "productPrice": "1000",
        "id": "-NNHAGkl2aY_gukhkuhiih",
    },
    {
        "productImage": "../../assets/images/nathan-dumlao-WAe-QkpE6as-unsplash.jpg",
        "productName": "Cofee",
        "productPrice": "100",
        "id": "-NNHAGkl2aY_gukhkuffyggj",
    },
    {
        "productImage": "../../assets/images/robert-bye-tG36rvCeqng-unsplash.jpg",
        "productName": "Bicycle",
        "productPrice": "1000",
        "id": "-NNHAGkl2aY_gukhgjhgklkn",
    },
  ];
  
  constructor(private http: HttpClient) {}

  // Using API for Data
  // postNewProduct(newP : any){
  //   this.http.post(ApiService.DatabaseUrl,newP);
  // }

  // getProducts(){
  //  const updatedProductData = this.http.get(ApiService.DatabaseUrl).pipe(map((catchedData:any)=>{
  //   const newPdtData= [];
  //   for( let key in catchedData){
  //     newPdtData.push({...catchedData[key], id : key})
  //   }
  //     return newPdtData;
  //   }));
  //   return updatedProductData;
  // }
  // ----------

  // Without Using Api show data
  getAllProdData(){
    this.allProducts= this.dummyProducts;
    this.allProducts$.next(this.allProducts);
    return this.allProducts$.asObservable();
  }
  getProd(searchTerm: string) {
    if(searchTerm !== null) {  // here Null used instead of '' for getting correct output result when no search text entered or erased //
      this.allProducts= this.dummyProducts.filter((prod: any) => prod.productName.toLowerCase().includes(searchTerm.toLowerCase()));
      console.log(this.allProducts);
      if(this.allProducts.length){
        this.allProducts$.next(this.allProducts);
      }
      else{
        window.alert("searched item not found try different keywords");
      }
    
    }
  }
}