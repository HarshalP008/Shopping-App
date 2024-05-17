import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-client-bills',
  templateUrl: './client-bills.component.html',
  styleUrls: ['./client-bills.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class ClientBillsComponent implements OnInit{
  sortedSampleBills: any = [];
  ascendingOrder :boolean =true;
  currentSortKey:any = '';
  showBillingDetails = false;
  billingSectionType ='all';
  searchClientName:any = '';
  
  // dummy bills accordiaon data for sorting
  
  sampleBills:any = [
    { invoiceNumber: 'Invoice#001', companyName: 'Bajaj', date: 'May2020', status: 'Success', period: 'June 15-18,2020', amount: '$7678.01' },
    { invoiceNumber: 'Invoice#002', companyName: 'Sony', date: 'Apr2020', status: 'Failed', period: 'June 12-14,2020', amount: '$7626.00' },
    { invoiceNumber: 'Invoice#003', companyName: 'Bajaj', date: 'Aug2020', status: 'Success', period: 'June 11,2020', amount: '$7678.00' },
    { invoiceNumber: 'Invoice#004', companyName: 'Apple', date: 'Jan2020', status: 'Success', period: 'June 1-7,2020', amount: '$7687.00' },
    { invoiceNumber: 'Invoice#0011', companyName: 'Samsung', date: 'Apr2020', status: 'Failed', period: 'June 12-14,2020', amount: '$7626.00' },
    { invoiceNumber: 'Invoice#0012', companyName: 'Lg', date: 'May2020', status: 'Success', period: 'June 15-18,2020', amount: '$7678.01' },
    { invoiceNumber: 'Invoice#0021', companyName: 'Nokia', date: 'Aug2020', status: 'Success', period: 'June 11,2020', amount: '$7678.00' },
    { invoiceNumber: 'Invoice#0100', companyName: 'Dell', date: 'Jan2020', status: 'Success', period: 'June 1-7,2020', amount: '$7687.00' }

  ];
  
  
  ngOnInit(): void {
    this.sortedSampleBills = [...this.sampleBills];
  }



  sortAccordions(sortKey: string) {
    if (this.currentSortKey === '') {
      this.ascendingOrder = !this.ascendingOrder;
    } else {
      this.ascendingOrder = true;
    }
    
    this.currentSortKey = sortKey;
    this.sortedSampleBills = this.sampleBills.sort((a:any, b:any) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];
      console.log(aValue,bValue);

      const compareValues = (a: string, b: string) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || '0');
      const numB = parseInt(b.match(/\d+/)?.[0] || '0');
      const stringA = a.replace(/[0-9]/g, '');
      const stringB = b.replace(/[0-9]/g, '');

      if (numA === numB) {
        return stringA.localeCompare(stringB);
        } else {
          return numA - numB;
        }
      };

      if (this.ascendingOrder) {
        return compareValues(aValue, bValue);
      } else {
        return compareValues(bValue, aValue);
      }    
    });
    this.currentSortKey = '';
  }

  searchClient(){
    if(this.searchClientName !== null) {  // here Null used instead of '' for getting correct output result when no search text entered or erased //
      this.sortedSampleBills= this.sampleBills.filter((client: any) => client.companyName.toLowerCase().includes(this.searchClientName.toLowerCase()));
      console.log(this.sortedSampleBills);
    }
  }
}