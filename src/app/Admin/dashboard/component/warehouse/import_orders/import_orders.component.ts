import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';

@Component({
  selector: 'app-import_orders',
  templateUrl: './import_orders.component.html',
  styleUrls: ['./import_orders.component.css']
})
export class Import_ordersComponent implements OnInit {
  // Mục khai báo biến
  import_order: any;
  title='Nhập kho sản phẩm';
  product:any;
  supplier:any;
  // categoryId :any;
  id: number;
  // isEdit: boolean = true;
  searchText:any;
  // voucher :any;
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
    private _router: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  import_order_from: FormGroup = new FormGroup({
    // id: new FormControl(),
    product_id: new FormControl('', Validators.required),
    supplier_id: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
  });


  ngOnInit() {
    this.send_title();
    this.get_all_import_order();
  }
  // gửi title đi
  send_title() {
    this.data_service.Title_message(this.title);
    // console.log('data',this.data_service.Title_message('Danh111'));
  }

  get_all_import_order() {
    this.admin.get_all_import_orders().subscribe(
      (data: any) => {
        this.import_order = data.import_order.map((import_order: any) => {
          import_order.updated_at = this.datePipe.transform(import_order.updated_at, 'HH:mm:ss dd-MM-yyyy');
          // voucher.end_date = this.datePipe.transform(voucher.end_date, ' HH:mm:ss dd-MM-yyyy');
          return import_order;
        });
        // this.import_order = data.import_order;
        this.product = data.product;
        this.supplier = data.supplier;
        console.log('data',data)
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onCreate() {
    // this.submitted=true;
    this.admin.create_import_order(this.import_order_from.value).subscribe((data) => {
        this.import_order_from.reset();
        // console.log(data);
        this.get_all_import_order();
        this.toastr.success('Thêm mới thành công!', );

        // window.location.reload();
      },
      (error) => {
        this.toastr.error('Thêm thất bại!');
      });
  }
  resetForm() {
    this.import_order_from.reset();
  }



  get_id(id: number)
  {
      //  this.id = this._router.snapshot.params['id'];
      this.id =id;
    this.admin.get_import_order(id).subscribe(data => {
      console.log('1',data.import_order.product_id)

      this.import_order_from = new FormGroup({
        product_id: new FormControl(data.import_order.product_id, Validators.required),
        supplier_id: new FormControl(data.import_order.supplier_id, Validators.required),
        quantity: new FormControl(data.import_order.quantity, Validators.required),
        price: new FormControl(data.import_order.price, Validators.required),
      });
      // this.isEdit = true; // Xác định là chức năng sửa
    })
  }

  onEdit() {

    this.admin.update_import_order(this.id, this.import_order_from.value).subscribe(data => {
      this.router.navigate(['/Import-orders']);
      this.import_order_from.reset();
      // console.log(data);
      this.get_all_import_order();
      this.toastr.success('Cập nhật thành công!', );
    },
    (error) => {
      this.toastr.error('cập nhật thất bại!');
    });
  }


  onDelete(id: number) {
    this.admin.delete_import_order(id).subscribe((data) => {
      this.get_all_import_order();
      this.toastr.success('Xóa thành công!', );
    },
    (error) => {
      console.log('lỗi xóa',error)
      this.toastr.error('Xóa thất bại!');
    });
  }

  openModal(id: number): void {
    this.id = id; // lưu lại id vào một biến trong component
    this.title = 'Bạn có chắc chắn muốn xóa?'; // hiển thị thông báo xác nhận
  }
     //phân trang
     ontableDataChange(event: any) {
      this.page = event;
      this.get_all_import_order();
    }
    ontableSizeChange(event: any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.get_all_import_order();
    }
}
