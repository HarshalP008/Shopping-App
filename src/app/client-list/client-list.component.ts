import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../shared/user.service';


@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  providers:[UserService]
})

export class ClientListComponent implements OnInit {
  @ViewChild('content', { static: true }) content: TemplateRef<any> | undefined;
  userData: any[] = [];
  userForm: FormGroup | any;
  searchTerm: string = '';
  filteredList !: any;
  unsubscribe$ = new Subject<void>();
  paginatedUserData: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  isEditMode: boolean = false;

  constructor(private fb: FormBuilder, private modalService: NgbModal, private userServ: UserService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: '',
      fName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      lName: ['', [Validators.required, Validators.pattern("^[a-zA-Z]*$")]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      city: ['', Validators.required]
    });
    this.getUserList();
    this.updatePaginatedData();
  }

  onSubmit() {
    if(this.isEditMode){
      this.userServ.editUser(this.userForm.value);
      this.isEditMode = false;
    }else{ 
      this.userServ.addUser(this.userForm.value);
    }
    this.userForm.reset();
    this.formModalClose();
    this.getUserList();    
  }

  formModalClose() {
    this.userForm.reset();
    this.modalService.dismissAll();
  }

  openSm(content: any) {
    this.modalService.open(content, { size: 'sm' });
  }

  getUserList() {
    this.userData = this.userServ.getUsersData(); // Using Localstorage data
    this.updatePaginatedData();
  }
  // getUserList() {
  //   //Using observable subscibe method
  //   this.userServ.getUsersData().pipe(takeUntil(this.unsubscribe$)).subscribe((data: any) => {
  //     this.userData = data;
  //     this.updatePaginatedData()
  //   })
  // }

  editUserData(user: any) {
    this.isEditMode = true;
    this.userForm.patchValue(user);
    this.openSm(this.content);
    this.getUserList();
  }

  deletUser(user: any) {
    this.userServ.removeUser(user);
    this.updatePaginatedData();
    this.getUserList();
  }

  searchUser() {
    this.userServ.search(this.searchTerm);
  }

  onPageChange(page: any) {
    // this.currentPage = page; // shows last page of pagination
    this.updatePaginatedData();
  }

  updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedUserData = this.userData.slice(startIndex, endIndex);
  }

}
