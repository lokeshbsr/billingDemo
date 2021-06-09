import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-new-bill',
  templateUrl: './new-bill.component.html',
  styleUrls: ['./new-bill.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewBillComponent implements OnInit {
  
  newBillList:newBill[]  = [];
  cartCount:number = 0;
  closeResult: string | undefined;
  totalBillAmount: number = 0.00;
  quantity: number = 0;
  totalItems: number = 0;
  selectedItemValue: string | undefined;
  itemsAvailableList = [
      {value: '0', viewValue: 'Book', amount:24},
      {value: '1', viewValue: 'Pencil', amount:6},
      {value: '2', viewValue: 'Eraser', amount:23}
  ];
  generatedBillsList:generatedBill[] = [];
  finalAmountSalesList:finalAmountsData[] = [];
  @ViewChild('mymodal') closeAddExpenseModal: any;
  
  constructor(private modalService: NgbModal) {}

  
  ngOnInit(): void {
    let objToday:finalAmountsData = {
      type: 'Today',
      amount: 0.00
    }
    let objMonthly:finalAmountsData = {
      type: 'This Month',
      amount: 0.00
    }
    let objYear:finalAmountsData = {
      type: 'This Year',
      amount: 0.00
    }
    this.finalAmountSalesList.push(objToday);
    this.finalAmountSalesList.push(objMonthly);
    this.finalAmountSalesList.push(objYear);
  }

  openSelectItem(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  onAddItem() {
    if(typeof(this.selectedItemValue) == 'undefined')  return alert("select item");
    if(this.quantity <= 0)  return alert("Enter Atleast 1 Quantity.");
    this.itemsAvailableList.forEach((rec)=>{
      if(this.selectedItemValue === rec.value) {
        let obj: newBill = {
            Amount: rec.amount*this.quantity,
            itemName: rec.viewValue,
            itemQunatity: this.quantity
        }
        this.newBillList.push(obj);
        this.cartCount++;
        this.totalBillAmount += obj.Amount;
        this.totalItems++;
      }
    });
    this.selectedItemValue = undefined;
    this.quantity=0;
    this.modalService.dismissAll();
  }

  onGenerate() {
    if(this.cartCount <=0 ) alert("Select Items Please.");
    this.newBillList.forEach((rec,i)=> {
      let obj:generatedBill={
        billAmount:this.totalBillAmount,
        billDate:new Date(),
        billCode:`BILL0000${this.cartCount}`,
      }
      this.generatedBillsList.push(obj);
    });
    this.cartCount = 0;
    this.newBillList = [];
    this.finalAmountSalesList.forEach((rec)=>{
       rec.amount += this.totalBillAmount;
    })
  }
 
  updateItemAmount() {
    
  }
  
  private getDismissReason(reason: any): string {
      return  `with: ${reason}`;
  }
}

interface newBill {
  itemName: string;
  itemQunatity: number;
  Amount:number;
}

interface generatedBill {
  billCode: string;
  billDate: Date;
  billAmount: number;
}

interface finalAmountsData {
   type: string;
   amount: number;
}