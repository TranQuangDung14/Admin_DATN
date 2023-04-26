import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { ComponentService } from '../../../../../core/services/component.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  // Mục khai báo biến
  title = 'Bài viết';
  id: number;
  // Id:number;
  // isEdit: boolean = true;
  searchText: any;
  post: any;
  selectedFile: File;
  type_post: any;
  //phân trang
  // POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];
  //end
  previewUrl: any;

  constructor(
    private admin: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private data_service: ComponentService
  ) {}
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
    type_post_id: new FormControl('', Validators.required),
    staff_id: new FormControl(''),
    title: new FormControl('', Validators.required),
    hashtag: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    // image: new FormControl('', Validators.required),
  });

  //all
  get_all_post() {
    this.admin.get_all_posts().subscribe(
      (data: any) => {
        this.post = data.posts_all;
        this.type_post = data.type_post;
        console.log(this.post);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onFileChange(event: any) {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.from_post.patchValue({ image: file });
      // this.from_post.value.image.updateValueAndValidity();
      this.selectedFile = event.target.files[0];
      // Read the file and update previewUrl
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
  // thêm mới
  onCreate() {
    if (this.from_post.valid) {
      const formData = new FormData();
      formData.append('type_post_id', this.from_post.value.type_post_id);
      formData.append('staff_id', this.from_post.value.staff_id);
      formData.append('title', this.from_post.value.title);
      formData.append('hashtag', this.from_post.value.hashtag);
      formData.append('content', this.from_post.value.content);
      // formData.append('content', this.from_post.get('content').value);

      if (this.selectedFile) {
        formData.append('image', this.selectedFile, this.selectedFile.name);
      }
      this.admin.create_posts(formData).subscribe(
        (data) => {
          // this.from_post.reset();
          this.resetForm();
          this.get_all_post();
          this.toastr.success('Thêm mới thành công!');
        },
        (error) => {
          this.toastr.error('Thêm thất bại!');
        }
      );
    }
  }
  resetForm() {
    this.from_post_edit.reset();
    this.from_post.reset();

  }

  previewImage: any ='';
  from_post_edit: FormGroup = new FormGroup({
    // id: new FormControl(),
    type_post_id: new FormControl('', Validators.required),
    staff_id: new FormControl(''),
    title: new FormControl('', Validators.required),
    hashtag: new FormControl('', Validators.required),
    content: new FormControl(''),
    image: new FormControl('', Validators.required),
  });

  // edit
  onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.from_post_edit.patchValue({ image: file });
    // this.from_post_edit.value.image.updateValueAndValidity();

    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result;
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  get_id(id: number) {
    //  this.id = this._router.snapshot.params['id'];
    this.id = id;
    console.log('id', id);
    this.admin.get_posts(id).subscribe((data) => {
      // console.log('1',data)
      this.from_post_edit = new FormGroup({
        type_post_id: new FormControl(data.type_post_id, Validators.required),
        staff_id: new FormControl(data.staff_id),
        title: new FormControl(data.title),
        hashtag: new FormControl(data.hashtag),
        // content: new FormControl(data.content),
        content: new FormControl(data.content),
        image: new FormControl(null),
        // image: new FormControl(data.image),
      });
      this.previewImage = "http://127.0.0.1:8000/storage/"+data.image;
      // this.isEdit = true; // Xác định là chức năng sửa
    });
  }

  onEdit() {
    if (this.from_post_edit.valid) {
      const formData = new FormData();
      formData.append('type_post_id', this.from_post_edit.value.type_post_id);
      formData.append('staff_id', this.from_post_edit.value.staff_id);
      formData.append('title', this.from_post_edit.value.title);
      formData.append('hashtag', this.from_post_edit.value.hashtag);
      formData.append('content', this.from_post_edit.value.content);
      formData.append('image', this.from_post_edit.value.image);
      // this.admin.update_posts(this.id, this.from_post.value).subscribe(

      this.admin.update_posts(this.id, formData).subscribe(
        (data) => {
          // this.router.navigate(['/brands']);
          this.from_post_edit.reset();
          // console.log(data);
          this.get_all_post();
          this.toastr.success('Cập nhật thành công!');
        },
        (error) => {
          console.log('why?',error)
          this.toastr.error('cập nhật thất bại!');
        }
      );
    }
  }

  // delete
  onDelete(id: number) {
    this.admin.delete_posts(id).subscribe(
      (data) => {
        this.get_all_post();
        this.toastr.success('Xóa thành công!');
      },
      (error) => {
        this.toastr.error('Xóa thất bại!');
      }
    );
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
