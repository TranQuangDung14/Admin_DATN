import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { ComponentService } from '../../../../../core/services/component.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  // Mục khai báo biến
  title = 'Bài viết';
  id: number;
  // Id:number;
  // isEdit: boolean = true;
  searchText: any;
  post :any;
  //phân trang
  // POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  //end

  constructor(
    private admin: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private data_service: ComponentService,
  ) { }
    // gửi title đi
    send_title() {
      this.data_service.Title_message(this.title);
      // console.log('data',this.data_service.Title_message('Danh111'));
    }
  ngOnInit(): void {
    this.send_title();
    this.get_all_post();
  }
  from_post: FormGroup = new FormGroup({
    // id: new FormControl(),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

 //all
 get_all_post() {
  this.admin.get_all_posts().subscribe(
    (data: any) => {
      this.post = data;
      console.log(this.post);
    },
    (error) => {
      console.log(error);
    }
  );
}


// thêm mới
onCreate() {
  // this.submitted=true;
  this.admin.create_posts(this.from_post.value).subscribe((data) => {
      // this.from_post.reset();
      this.resetForm();
      this.get_all_post();
      this.toastr.success('Thêm mới thành công!', );

    },
    (error) => {
      this.toastr.error('Thêm thất bại!');
    });
}
resetForm() {
  this.from_post.reset();
}

get_id(id: number)
{
    //  this.id = this._router.snapshot.params['id'];
    this.id =id;
    console.log('id',id)
  this.admin.get_posts(id).subscribe(data => {
    // console.log('1',data)
    this.from_post = new FormGroup({
      name: new FormControl(data.brands.name,Validators.required),
      description: new FormControl(data.brands.description),
    });
    // this.isEdit = true; // Xác định là chức năng sửa
  })
}

onEdit() {

  this.admin.update_posts(this.id, this.from_post.value).subscribe(data => {
    // this.router.navigate(['/brands']);
    this.from_post.reset();
    // console.log(data);
    this.get_all_post();
    this.toastr.success('Cập nhật thành công!', );
  },
  (error) => {
    this.toastr.error('cập nhật thất bại!');
  });
}

onDelete(id: number) {
  this.admin.delete_posts(id).subscribe((data) => {
    this.get_all_post();
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
  this.get_all_post();
}
ontableSizeChange(event: any): void {
  this.tableSize = event.target.value;
  this.page = 1;
  this.get_all_post();
}
}