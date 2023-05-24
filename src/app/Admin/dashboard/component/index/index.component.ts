import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  name_task:any = 'Bảng điều khiên';
  title='Bảng điều khiển';
  product:any;
  order:any;
  customer:any;
  constructor(
    private admin: ApiService,
    private data_service: ComponentService,
    private toastr: ToastrService,
    private router :Router,
    private _router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.get_statistical();
    // this.name_task
    this.send_title();
    console.log(this.name_task);
  }
 // gửi title đi
 send_title() {
  this.data_service.Title_message(this.title);
  // console.log('data',this.data_service.Title_message('Danh111'));
}
get_statistical(){
  this.admin.get_dashboard().subscribe(
    (data: any) => {
      this.product = data.product;
      this.order = data.order;
      this.customer = data.customer;
      // console.log(this.brands);
    },
    (error) => {
      console.log(error);
    }
  );
}
}
