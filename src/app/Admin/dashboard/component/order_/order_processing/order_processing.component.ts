import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';

@Component({
  selector: 'app-order_processing',
  templateUrl: './order_processing.component.html',
  styleUrls: ['./order_processing.component.css']
})
export class Order_processingComponent implements OnInit {

 // Mục khai báo biến
 order: any;
 product: any;
 customer: any;

 title = 'Quản lý đơn hàng chưa xử lý ';
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

 ngOnInit() {
  this.getall_order();
  this.send_title();
 }
 // gửi title đi
 send_title() {
   this.data_service.Title_message(this.title);
 }
 getStatusText(status: number): string {
  switch (status) {
    case 1:
      return 'Đang chờ xử lý';
    case 2:
      return '<span style="background-color: red;">Đã xác nhận đơn hàng</span>';
    case 3:
      return 'Đã xuất hàng';
    case 4:
      return 'Hoàn thành';
    case 5:
      return 'Hủy đơn';
    default:
      return '';
  }
}


getall_order() {
   this.admin.get_order_processing()
    .subscribe((data: any) => {
      console.log('order11',data);
      this.order = data;
      // console.log('non',this.id)

    }, error => {
      this.toastr.error('Hiển thị lỗi!');

    }
    )
}
from: FormGroup = new FormGroup({
  // id: new FormControl(),
  status: new FormControl(2, Validators.required),
});
// get_id(id: number)
//   {
//       //  this.id = this._router.snapshot.params['id'];
//       this.id =id;
//     this.admin.get_category(id).subscribe(data => {
//       this.from = new FormGroup({
//         status: new FormControl(2, Validators.required),
//       });
//     })
//   }

status:number=2;
// id: number;
// cập nhật trạng thái
update_status_orders(id: number) {
  this.id = id;
  console.log('status', this.status);
  this.admin.update_order_status(this.id, this.status).subscribe(
    (data) => {
      this.getall_order();
      this.toastr.success('Xác nhận đơn hàng thành công!');
    },
    (error) => {
      console.log('error', error);
      this.toastr.error('Cập nhật thất bại!');
    }
  );
}
order_detail:any;
get_order_id(id:number){
  this.id =id;
  this.admin.get_order_id(this.id).subscribe(data=>{
    this.order_detail=data.data;
    console.log(this.order_detail);
  })
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
