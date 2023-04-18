import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product_edit',
  templateUrl: './product_edit.component.html',
  styleUrls: ['./product_edit.component.css'],
})
export class Product_editComponent implements OnInit {
  private subscription: Subscription;
  productForm: FormGroup;
  imageFiles: File[] = [];
  category_product: any;
  product: any;
  id: number;
  images: any;
  data = [];
  constructor(
    private formBuilder: FormBuilder,
    private admin: ApiService,
    private _router: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) {}

  ngOnInit(): void {
    this.id = this._router.snapshot.params['id'];
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      default_price: ['', Validators.required],
      // price: ['', Validators..],
      tech_specs: [''],
      category_id: [''],
      description: [''],
      // image: [null]
    });

    this.get_all_product();

    this.subscription = this.admin.get_product(this.id).subscribe(
      (data: any) => {
        this.productForm.patchValue(data.product); // đưa data vào form
        this.product = data.product;
        // this.images=data.images;
        console.log('data', data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  get_all_product() {
    this.subscription = this.admin.get_all_product().subscribe(
      (data: any) => {
        this.category_product = data.category_product;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('category_id', this.productForm.value.category_id);
    formData.append('name', this.productForm.value.name);
    formData.append('default_price', this.productForm.value.default_price);
    formData.append('tech_specs', this.productForm.value.tech_specs);
    formData.append('description', this.productForm.value.description);
    // formData.append('_method', 'PUT');

    console.log('name', formData);
    if (this.imageFiles && this.imageFiles.length > 0) {
      for (let i = 0; i < this.imageFiles.length; i++) {
        if (this.imageFiles[i]) {
          // Thêm điều kiện kiểm tra tệp không phải null
          // formData.append(`existing_images[${i}]`, this.product.images[i].id);
          formData.append(`image[${i}]`, this.imageFiles[i]);
        }
      }
    }

    // remove existing images that are not in the current selection
    // if (this.product && this.product.images) {
    //   for (let i = 0; i < this.product.images.length; i++) {
    //     const existingImage = this.product.images[i];
    //     if (
     //     // !this.imageFiles.some((file) => file.name === existingImage.filename)
    //       // console.log('file',file.name)
    //     ) {
    //       // formData.append(`existing_images[${i}]`, this.product.images[i]);
    //       // formData.append(`existing_images[${i}][_destroy]`, '1');
    //       // formData.append(`existing_images[${i}][filename]`, existingImage.filename);
    //       formData.append(`existing_images[${i}][id]`, existingImage.id);
    //       formData.append(`existing_images[${i}][filename]`, existingImage.filename);
    //     }
    //   }
    // }
    formData.forEach((value, key) => {
      console.log('?', key, value);
    });
    console.log(this.productForm.value);
    this.admin.update_product(this.id, formData).subscribe(
      (res) => {
        // console.log('vào đây r', res);
        // formData.forEach((value, key) => {
        //   console.log(key, value);
        // });
        // do something with the response
        this.toastr.success('Cập nhật thành công!', );
        this.router.navigate(['/product']); // navigate to products page after successful update
      },
      (error) => {
        this.toastr.error('Cập nhật thất bại!', );
        // formData.forEach((value, key) => {
        //   console.log(key, value);
        // }),
        //   console.log('lỗi đấy', error);

        // do something with the error
      }
    );
  }
  deleteImage(imageId: number) {
    const index = this.product.images.findIndex(
      (img: any) => img.id === imageId
    );
    if (index !== -1) {
      this.product.images.splice(index, 1);
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader(); // tạo mới đối tượng FileReader
        const file = event.target.files[i]; // lấy file được chọn
        reader.readAsDataURL(file); // đọc file dưới dạng URL
        reader.onload = () => {
          // xử lý khi đã đọc xong file
          const result = reader.result as string; // chuyển đổi kết quả đọc file về dạng chuỗi
          // hiển thị ảnh trước khi tải lên
          const previewDiv = document.getElementById('preview')!;
          const image = document.createElement('img');
          image.src = result;
          image.width = 150; // đặt chiều rộng của ảnh
          previewDiv.appendChild(image); // thêm ảnh vào thẻ div có id là 'preview'

          // tạo nút X để xóa ảnh
          const deleteButton = document.createElement('button');
          deleteButton.innerHTML = 'X';
          deleteButton.onclick = () => {
            previewDiv.removeChild(image); // xóa ảnh khỏi thẻ div
            previewDiv.removeChild(deleteButton); // xóa X
            this.imageFiles.splice(this.imageFiles.indexOf(file), 1); // xóa file khỏi mảng
          };
          previewDiv.appendChild(deleteButton); // thêm nút X vào thẻ div
        };
        this.imageFiles.push(file);
      }
    }
  }
}
