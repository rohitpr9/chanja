import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from "@angular/common";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  customerForm!: FormGroup;
  customerName: string = '';
  image: string = ''

  constructor(private _formBuilder: FormBuilder, @Inject(PLATFORM_ID) private platformId: object) {

  }

  ngOnInit(): void {
    this.customerDetailsForm();
    const getStorage = localStorage.getItem("customer_list")
    if (getStorage && sessionStorage.getItem("Admin")) {
      this.useStorage();
    }

  }

  customerDetailsForm() {
    this.customerForm = this._formBuilder.group({
      customer: this._formBuilder.array([
        this._formBuilder.group({
          customerName: new FormControl(""),
          items: this._formBuilder.array([
            this._formBuilder.group({
              itemName: new FormControl(""),
              price: new FormControl("")
            })
          ])
        })

      ])
    })
  }

  get customer() {
    return this.customerForm.get('customer') as FormArray;
  }

  items(index: any): any {
    return this.customer.at(index).get('items') as FormArray;
  }



  addCusotmer() {
    this.customer.push(
      this._formBuilder.group({
        customerName: [""],
        items: this._formBuilder.array([
          this._formBuilder.group({
            itemName: [""],
            price: [""]
          })
        ])
      })
    )



    if (isPlatformBrowser(this.platformId)) {
      const getCustomer = this.customerForm.get('customer')?.value;
      localStorage.setItem('customer_list', JSON.stringify(getCustomer));
    }
  }

  removeCustomer(i: any) {
    this.customer.removeAt(i)
  }



  addItems(index: any) {
    const customerGroup = this.customer.at(index) as FormGroup;
    const item = customerGroup.get('items') as FormArray;
    item.push(this._formBuilder.group({
      itemName: [""],
      price: [""]
    }))
  }

  removeItems(i: any, j: any) {
    console.log(i, j)
  }




  useStorage() {
    const storedList = localStorage.getItem("customer_list");
    if (storedList) {
      const parsed = JSON.parse(storedList);
      this.customer.clear()
      parsed.forEach((element: any) =>
        this.customer.push(this.createList(element))
      );
    }
  }


  createList(info: any): FormGroup {
    return this._formBuilder.group({
      customerName: [info?.customerName],
      items: this._formBuilder.array((info.items || []).map((list: any) =>
        this.createItems(list)
      ))
    })
  }

  createItems(items: any): FormGroup {
    return this._formBuilder.group({
      itemName: [items.itemName],
      price: [items.price]
    })
  }

  getName(event: HTMLInputElement) {
    const name = event.value
    this.customerName = name;

  }

  view(name: string) {
    this.image = name;
  }

  close(){
    this.image = ''
  }
}
