import { Component, OnInit } from '@angular/core';
import { PractiseService } from '../practise.service';

@Component({
  selector: 'app-practise',
  standalone: true,
  imports: [],
  templateUrl: './practise.component.html',
  styleUrl: './practise.component.scss'
})
export class PractiseComponent implements OnInit {

  users: any[] = [];
  posts: any[] = [];
  todos: any[] = [];
  groupByPost: Record<string, any[]> = {}

  constructor(private _practiseServices: PractiseService) {

  }
  ngOnInit(): void {
    this.getUserList();
  }



  getUserList() {

  }


}
