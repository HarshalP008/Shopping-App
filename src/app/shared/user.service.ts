import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersList:any[]= [];
  allUsers$= new BehaviorSubject<any>(this.usersList);
  filteredList: any =[];
  
  constructor(){
    this.usersList= JSON.parse(localStorage.getItem('usersData') || '');
  }

  getUsersData(){
    this.allUsers$.next(this.usersList);
    return this.allUsers$.asObservable();
  }

  addUser(newUser: any){
    this.usersList.push(newUser);
    localStorage.setItem("usersData", JSON.stringify(this.usersList));
    alert('New User Added');
  }

  removeUser(user: any) {
    let confirmDelete = window.confirm("Are you sure to delete this user")
    if (confirmDelete) {
      this.usersList.map((ele: any, index: any) => {
        if (user.id === ele.id) {
          this.usersList.splice(index, 1);
          localStorage.setItem("usersData", JSON.stringify(this.usersList));
          this.allUsers$.next(this.usersList);
        }
      })
    }
  }

  search(searchTerm: string) {
    if(searchTerm !== null) {
      this.filteredList= this.usersList.filter((user: any) => user.fName.toLowerCase().includes(searchTerm.toLowerCase()) || user.lName.toLowerCase().includes(searchTerm.toLowerCase()));
      console.log(this.filteredList);
      if(this.filteredList.length){
        this.allUsers$.next(this.filteredList);
      }
      else{
        window.alert("searched item not found try different keywords");
      }    
    }
  }
}
