import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usersList: any[] = [];
  allUsers$ = new BehaviorSubject<any>('');
  filteredList: any = [];

  constructor(private toastServ: ToastService) {
    this.usersList = JSON.parse(localStorage.getItem('usersData') || '');
  }

  getUsersData() {
    return this.usersList = JSON.parse(localStorage.getItem('usersData') || '');// localstorage data
    
    // using observable
    // this.allUsers$.next(this.usersList);
    // return this.allUsers$.asObservable();
  }

  addUser(user: any) {
    let randumNum = new Date().getUTCDate().toString() + new Date().getTime().toString();
      let id = randumNum + (Math.floor(Math.random() * 10000) + 1); // Generates id for users using fullyear
      let newUser = { ...user, id };
      this.usersList.push(newUser);
      alert('New Client Added')
      localStorage.setItem("usersData", JSON.stringify(this.usersList));
  }
  
  editUser(user: any) {
    const index = this.usersList.findIndex(userEdit => userEdit.id == user.id);
      if (index !== -1) {
        this.usersList[index] = user;
      }
      this.toastServ.show('Client Data Updated Successfully',{ classname: 'bg-success text-light mt-2', delay: 4000, autohide: true});
      localStorage.setItem("usersData", JSON.stringify(this.usersList));
  }

  removeUser(user: any) {
    let confirmDelete = window.confirm("Are you sure to delete this user")
    if (confirmDelete) {
      this.usersList.map((ele: any, index: any) => {
        if (user.id === ele.id) {
          this.usersList.splice(index, 1);
          localStorage.setItem("usersData", JSON.stringify(this.usersList));
          // this.allUsers$.next(this.usersList);
        }
      })
    }
  }

  search(searchTerm: string) {
    if (searchTerm !== null) {
      this.filteredList = this.usersList.filter((user: any) => user.fName.toLowerCase().includes(searchTerm.toLowerCase()) || user.lName.toLowerCase().includes(searchTerm.toLowerCase()));
      // console.log(this.filteredList);
      if (this.filteredList.length) {
        this.allUsers$.next(this.filteredList);
      }
      else {
        window.alert("searched item not found try different keywords");
      }
    }
  }
}
