import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor() { }
  @Input() finalSalesAmount:finalAmountsData[] = []; 
  
  ngOnInit(): void {
  }

}

interface finalAmountsData {
  type: string;
  amount: number;
}
