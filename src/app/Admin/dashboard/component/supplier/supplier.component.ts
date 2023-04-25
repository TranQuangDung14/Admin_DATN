import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent implements OnInit {
  private subscription: Subscription;
  // Mục khai báo biến
  supplier: any;
  title='Nhà cung cấp';
  info_supplier :any;
  id: number;
  searchText:any;

  //phân trang
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
  submitted:boolean = false;
  // form đối tượng
  info_supplier_from: FormGroup = new FormGroup({
    name : new FormControl('',Validators.required),
    email: new FormControl('',Validators.email),
    adress: new FormControl('',Validators.required),
    number_phone: new FormControl('',[Validators.min(100000000),Validators.max(10000000000)]),
    // sectors: new FormControl('',Validators.required),
  });

  // danh sách
  getall_info_supplier(){
    this.subscription = this.admin.get_all_info_supplier().subscribe((data:any)=>{
      console.log(data);
      this.info_supplier=data;
    },error =>{
      console.log(error);
    }
    )
}

// main
  ngOnInit() {
    this.send_title();
    this.getall_info_supplier();
  }


  // resetform
  resetForm() {
    this.info_supplier_from.reset();
  }


  // gửi title đi
  send_title() {
    this.data_service.Title_message(this.title);
  }

  get f(){
    return this.info_supplier_from.controls;
  }
  onCreate(){
    // this.submitted=true;
    this.subscription = this.admin.create_info_supplier(this.info_supplier_from.value).subscribe((data)=>{
      // console.log(data);
      this.info_supplier_from.reset();
      this.getall_info_supplier();
      this.toastr.success('Thêm mới thành công!', );
    },
    (error) => {
      this.toastr.error('thêm mới thất bại!');
    }
    )
  }


  get_id(id: number)
  {
      //  this.id = this._router.snapshot.params['id'];
      this.id =id;
    this.admin.get_info_supplier(id).subscribe(data => {
      // console.log('1',data)
      this.info_supplier_from = new FormGroup({
        name: new FormControl(data.name,Validators.required),
        email: new FormControl(data.email,Validators.required),
        adress: new FormControl(data.adress,Validators.required),
        number_phone: new FormControl(data.number_phone,Validators.required),
        sectors: new FormControl(data.sectors,Validators.required),
        // product_supplier_id: new FormControl(data.product_supplier_id),
      });
      // this.isEdit = true; // Xác định là chức năng sửa
    })
  }
  onEdit() {
    // this.submitted=true;
    this.admin.update_info_supplier(this.id, this.info_supplier_from.value).subscribe(data => {
      this.router.navigate(['/supplier']);
      this.info_supplier_from.reset();
      // console.log(data);
      this.getall_info_supplier();
      this.toastr.success('Cập nhật thành công!', );

    });
  }

  // xóa
  onDelete(id: number) {
    this.admin.delete_info_supplier(id).subscribe((data) => {
      this.getall_info_supplier();
      this.toastr.success('Xóa thành công!', );
    },
    (error) => {
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
      this.getall_info_supplier();
    }
    ontableSizeChange(event: any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.getall_info_supplier();
    }
}
