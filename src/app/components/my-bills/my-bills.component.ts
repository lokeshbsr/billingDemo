import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-bills',
  templateUrl: './my-bills.component.html',
  styleUrls: ['./my-bills.component.css']
})
export class MyBillsComponent implements OnInit {

  constructor() { }
  @Input() saleBillsList:generatedBill[] = []; 
  
  ngOnInit(): void {
  }

}

interface generatedBill {
  billCode: string;
  billDate: Date;
  billAmount: number;
}
