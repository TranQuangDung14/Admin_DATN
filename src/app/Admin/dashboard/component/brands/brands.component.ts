import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  // Mục khai báo biến
  title = 'Thương hiệu';
  id: number;
  // Id:number;
  // isEdit: boolean = true;
  searchText: any;
  brands :any;
  //phân trang
  // POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  //end

  from_brands: FormGroup = new FormGroup({
    // id: new FormControl(),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(
    private admin: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private data_service: ComponentService,
  ) {}
  // gửi title đi
  send_title() {
    this.data_service.Title_message(this.title);
    // console.log('data',this.data_service.Title_message('Danh111'));
  }
  ngOnInit() {
    this.send_title();
    this.get_all_brands();
  }
  //all
  get_all_brands() {
    this.admin.get_all_brands().subscribe(
      (data: any) => {
        this.brands = data;
        console.log(this.brands);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  // thêm mới
  onCreate() {
    // this.submitted=true;
    this.admin.create_brands(this.from_brands.value).subscribe((data) => {
        // this.from_brands.reset();
        this.resetForm();
        this.get_all_brands();
        this.toastr.success('Thêm mới thành công!', );

      },
      (error) => {
        this.toastr.error('Thêm thất bại!');
      });
  }
  resetForm() {
    this.from_brands.reset();
  }

  get_id(id: number)
  {
      //  this.id = this._router.snapshot.params['id'];
      this.id =id;
      console.log('id',id)
    this.admin.get_brands(id).subscribe(data => {
      // console.log('1',data)
      this.from_brands = new FormGroup({
        name: new FormControl(data.brands.name,Validators.required),
        description: new FormControl(data.brands.description),
      });
      // this.isEdit = true; // Xác định là chức năng sửa
    })
  }

  onEdit() {

    this.admin.update_brands(this.id, this.from_brands.value).subscribe(data => {
      // this.router.navigate(['/brands']);
      this.from_brands.reset();
      // console.log(data);
      this.get_all_brands();
      this.toastr.success('Cập nhật thành công!', );
    },
    (error) => {
      this.toastr.error('cập nhật thất bại!');
    });
  }

  onDelete(id: number) {
    this.admin.delete_brands(id).subscribe((data) => {
      this.get_all_brands();
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
    this.get_all_brands();
  }
  ontableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.get_all_brands();
  }
}
