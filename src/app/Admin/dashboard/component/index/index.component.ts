import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  name_task:any = 'Bảng điều khiên';
  constructor() { }

  ngOnInit() {
    // this.name_task
    console.log(this.name_task);
  }

}
