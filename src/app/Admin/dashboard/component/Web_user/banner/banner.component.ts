import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  private subscription: Subscription;
  // Mục khai báo biến
  voucher: any;
  title='Banner';
  // categoryId :any;
  id: number;
  selectedFile: File;
  // isEdit: boolean = true;
  searchText:any;
  previewUrl: any;
  banner:any;
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
  ngOnInit() {
    this.send_title();
    this.get_all_banner();
  }
   // gửi title đi
   send_title() {
    this.data_service.Title_message(this.title);
    // console.log('data',this.data_service.Title_message('Danh111'));
  }
  from: FormGroup = new FormGroup({
    // id: new FormControl(),
    ordinal: new FormControl(''),
  });
  //all
  get_all_banner() {
    this.admin.get_banner().subscribe(
      (data: any) => {
        // this.user =data.user();
        this.banner = data.banner;
        // this.type_post = data.type_post;
        console.log('post',this.banner);
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
      this.from.patchValue({ image: file });
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
      if (this.from.valid) {
        const formData = new FormData();
        formData.append('ordinal', this.from.value.ordinal);
        // formData.append('content', this.from_post.get('content').value);

        if (this.selectedFile) {
          formData.append('image', this.selectedFile, this.selectedFile.name);
        }
        this.admin.create_banner(formData).subscribe(
          (data) => {
            // this.from_post.reset();
            this.resetForm();
            // this.get_all_post();
            this.toastr.success('Thêm mới thành công!');
          },
          (error) => {
            this.toastr.error('Thêm thất bại!');
          }
        );
      }
    }
    resetForm() {
      // this.from_post_edit.reset();
      this.from.reset();

    }
  //phân trang
  ontableDataChange(event: any) {
    this.page = event;
    // this.get_all_voucher();
  }
  ontableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    // this.get_all_voucher();
  }
}
