import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  private subcription: Subscription;
  // Mục khai báo biến
  order:any;
  product:any;
  customer:any;

  title='Quản lý đơn hàng';
  categoryId :any;
  id: number;
  // isEdit: boolean = true;
  searchText:any;

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
    private router :Router,
    private _router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.send_title();
    this.getall_order();
  }

    // gửi title đi
    send_title() {
      this.data_service.Title_message(this.title);
    }

    getall_order() {
      this.subcription = this.admin.get_all_order()
        .subscribe((data: any) => {
          console.log('order',data);
          // console.log('product',data.product);
          // console.log('customer',data.customer);
          this.order = data.order;
          // this.product = data.product;
          // this.customer = data.customer;

        }, error => {
          this.toastr.error('Hiển thị lỗi!');

        }
        )
    }
        //phân trang
        ontableDataChange(event: any) {
          this.page = event;
          this.getall_order();
        }
        ontableSizeChange(event: any): void {
          this.tableSize = event.target.value;
          this.page = 1;
          this.getall_order();
        }

}
