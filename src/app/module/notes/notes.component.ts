import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  public formGroup!: FormGroup
  public formGroupStorage: any


  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroupStorage = JSON.parse(localStorage.getItem('client') ?? '{}')
    this._buildForm()
  }

  private _buildForm() {
    this.formGroup = this._formBuilder.group({
      customerDetails: this._formBuilder.array(this.formGroupStorage?.customerDetails?.length ? (this.formGroupStorage.customerDetails ?? []).map((details: any) =>
        this.getCustomerDetails(details)
      ) : [this.getCustomerDetails()])
    })
  }

  get customerDetails(): FormArray<FormGroup> {
    return this.formGroup.get('customerDetails') as FormArray<FormGroup>
  }

  public items(index: number): FormArray<FormGroup> {
    return this.customerDetails.at(index).get('items') as FormArray<FormGroup>
  }

  public getCustomerDetails(value?: any): FormGroup {
    return this._formBuilder.group({
      name: [value?.name ?? ''],
      isPaid: [value?.isPaid ?? false],
      items: this._formBuilder.array(value?.items?.length ? (value?.items || []).map((item: any) =>
        this.getItems(item)
      ) : [this.getItems()]),
    })
  }

  public getItems(item?: any): FormGroup {
    return this._formBuilder.group({
      itemName: [item?.itemName ?? ''],
      itemCount: [item?.itemCount ?? 0],
    })
  }

  public addCustomer(): void {
    this.customerDetails.push(this.getCustomerDetails())
  }

  public paidByCustomer(bill: string, index: number): void {
    const getIsPaid = this.customerDetails.at(index).get('isPaid')
    getIsPaid?.patchValue(bill === 'paid')
    localStorage.setItem('client', JSON.stringify(this.formGroup.value))

  }

  public addItem(index: number): void {
    const value = (this.customerDetails.at(index)).get('items') as FormArray<FormGroup>
    value.push(this.getItems())
  }

  public onDeleteItem(cusomerIndex: number, itemIndex: number): void {
    this.items(cusomerIndex)?.removeAt(itemIndex)
  }

  public onSubmit(): void {
    localStorage.setItem('client', JSON.stringify(this.formGroup.value))
  }

}
