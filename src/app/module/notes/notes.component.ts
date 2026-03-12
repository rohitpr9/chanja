import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  public formGroup!: FormGroup
  public isPaid: boolean[] = []


  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this._buildForm()
    this.isPaid.fill(false)

  }

  // this.getCustomerDetails
  private _buildForm() {
    const value = JSON.parse(localStorage.getItem('client') ?? '{}')
    this.formGroup = this._formBuilder.group({
      customerDetails: this._formBuilder.array((value.customerDetails??[]).map((details: any) => {
        this.getCustomerDetails(details)
      }))
    })
  }

  get customerDetails(): FormArray<FormGroup> {
    return this.formGroup.get('customerDetails') as FormArray<FormGroup>
  }


  public items(index: number): FormArray<FormGroup> {
    return this.customerDetails.at(index).get('items') as FormArray<FormGroup>
  }

  // this.getItems
  public getCustomerDetails(value?: any): FormGroup {
    return this._formBuilder.group({
      name: [value.name || ''],
      items: this._formBuilder.array((value.items || []).map((item: any) => {
        this.getItems(item)
      })),
    })
  }


  public getItems(item?: any): FormGroup {
    return this._formBuilder.group({
      itemName: [item.itemName || ''],
      itemCount: [item.itemName || 0],
    })
  }


  public addCustomer(): void {
    this.customerDetails.push(this.getCustomerDetails())
  }

  public paidByCustomer(bill: string, index: number): void {
    this.isPaid[index] = bill === 'paid'
    localStorage.setItem('isPaid', JSON.stringify(this.isPaid[index]))


  }


  public addItem(index: number): void {
    const value = (this.customerDetails.at(index)).get('items') as FormArray<FormGroup>
    value.push(this.getItems())
  }

  public onSubmit(): void {
    localStorage.setItem('client', JSON.stringify(this.formGroup.value))
  }


}
