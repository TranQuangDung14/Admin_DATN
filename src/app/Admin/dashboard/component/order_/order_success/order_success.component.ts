import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';

@Component({
  selector: 'app-order_success',
  templateUrl: './order_success.component.html',
  styleUrls: ['./order_success.component.css']
})
export class Order_successComponent implements OnInit {
 // Mục khai báo biến
 order: any;
 product: any;
 customer: any;

 title = 'Quản lý đơn hàng giao thành công';
 categoryId: any;
 id: number;
 // isEdit: boolean = true;
 searchText: any;

 //phân trang
 // POSTS: any;
 page: number = 1;
 count: number = 0;
 tableSize: number = 5;
 tableSizes: any = [5, 10, 15, 20];
 //end

 constructor(
   private admin: ApiService,
   private data_service: ComponentService,
   private toastr: ToastrService,
   private router: Router,
   private _router: ActivatedRoute
 ) {}

 ngOnInit() {}
 // gửi title đi
 send_title() {
   this.data_service.Title_message(this.title);
 }
 //phân trang
 ontableDataChange(event: any) {
   this.page = event;
   // this.getall_order();
 }
 ontableSizeChange(event: any): void {
   this.tableSize = event.target.value;
   this.page = 1;
   // this.getall_order();
 }
}
