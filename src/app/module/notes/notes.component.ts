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


  private _buildForm() {
    this.formGroup = this._formBuilder.group({
      customerDetails: this._formBuilder.array([
        this.getCustomerDetails
      ])
    })
  }

  get customerDetails(): FormArray<FormGroup> {
    return this.formGroup.get('customerDetails') as FormArray<FormGroup>
  }


  public get getCustomerDetails(): FormGroup {
    return this._formBuilder.group({
      name: [''],
      items: this._formBuilder.array([
        this.getItems
      ]),
    })
  }

  public get getItems(): FormGroup {
    return this._formBuilder.group({
      itemName: [''],
      itemCount: [0],
    })
  }


  public addCustomer(): void {
    this.customerDetails.push(this.getCustomerDetails)
  }

  public paidByCustomer(bill: string, index: number): void {
    this.isPaid[index] = bill === 'paid'
  }

  public onSubmit(): void {

  }


}
