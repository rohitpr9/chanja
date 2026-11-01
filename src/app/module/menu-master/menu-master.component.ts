import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-menu-master',
  templateUrl: './menu-master.component.html',
  styleUrls: ['./menu-master.component.css'],
})
export class MenuMasterComponent implements OnInit {
  public formGroup!: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _formArray: FormArray,
  ) {}

  ngOnInit(): void {}
}
