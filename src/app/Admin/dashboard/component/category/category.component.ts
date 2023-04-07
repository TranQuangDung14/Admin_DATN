import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ComponentService } from '../../../../core/services/component.service';
import { ToastrService } from 'ngx-toastr';
// import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/shared/components/delete/delete.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  private subscription: Subscription;
  // Mục khai báo biến
  category_product: any;
  supplier: any;
  title='Danh mục sản phẩm';
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
    // public dialog: MatDialog
    ) {}

  category_product_from: FormGroup = new FormGroup({
    // id: new FormControl(),
    name: new FormControl('', Validators.required),
    product_supplier_id: new FormControl('', Validators.required),
  });

  ngOnInit() {
    this.get_all_category_product();
    this.send_title();
  }

  // gửi title đi
  send_title() {
    this.data_service.Title_message(this.title);
    // console.log('data',this.data_service.Title_message('Danh111'));
  }

  get_all_category_product() {
    this.subscription = this.admin.getallcategory_product().subscribe(
      (data: any) => {
        // console.log('category_product', data.category_product);
        // console.log('supplier', data.supplier);
        // console.log('category', data.category);
        this.category_product = data.category_product;
        this.supplier = data.supplier;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onCreate() {
    // this.submitted=true;
    this.admin
      .create_category_product(this.category_product_from.value)
      .subscribe((data) => {
        this.category_product_from.reset();
        // console.log(data);
        this.get_all_category_product();
        this.toastr.success('Thêm mới thành công!', );

        // window.location.reload();
      });
  }
  resetForm() {
    this.category_product_from.reset();
  }
  get_id(id: number)
  {
      //  this.id = this._router.snapshot.params['id'];
      this.id =id;
    this.admin.get_category(id).subscribe(data => {
      // console.log('1',data)
      this.category_product_from = new FormGroup({
        name: new FormControl(data.name,Validators.required),
        product_supplier_id: new FormControl(data.product_supplier_id),
      });
      // this.isEdit = true; // Xác định là chức năng sửa
    })
  }

  onEdit() {

    this.admin.update_category(this.id, this.category_product_from.value).subscribe(data => {
      this.router.navigate(['/category']);
      this.category_product_from.reset();
      // console.log(data);
      this.get_all_category_product();
      this.toastr.success('Cập nhật thành công!', );
    });
  }

  onDelete(id: number) {
    this.admin.delete_category(id).subscribe((data) => {
      this.get_all_category_product();
      this.toastr.success('Xóa thành công!', );
    },
    (error) => {
      this.toastr.error('Xóa thất bại!');
    });
  }

  openModal(id: number): void {
    this.categoryId = id; // lưu lại id vào một biến trong component
    this.title = 'Bạn có chắc chắn muốn xóa?'; // hiển thị thông báo xác nhận
  }

    //phân trang
    ontableDataChange(event: any) {
      this.page = event;
      this.get_all_category_product();
    }
    ontableSizeChange(event: any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.get_all_category_product();
    }
}
