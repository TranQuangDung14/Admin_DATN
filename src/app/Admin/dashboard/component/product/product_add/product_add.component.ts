import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../../../core/services/api.service';

@Component({
  selector: 'app-product_add',
  templateUrl: './product_add.component.html',
  styleUrls: ['./product_add.component.css']
})
export class Product_addComponent implements OnInit {
  private subscription: Subscription;
  productForm: FormGroup;
  imageFiles: File[] = [];
  category_product :any;
  constructor(
    private formBuilder: FormBuilder,
    private admin: ApiService
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      default_price: ['', Validators.required],
      // price: ['', Validators.required],
      tech_specs: [''],
      category_id: [''],
      description: [''],
      image: [null]
    });

    this.get_all_product();
  }

  get_all_product() {
    this.subscription = this.admin.get_all_product()
      .subscribe((data: any) => {
        this.category_product = data.category_product;
      }, error => {
        console.log(error);

      }
      )
  }
  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('default_price', this.productForm.value.default_price);
    formData.append('tech_specs', this.productForm.value.tech_specs);
    formData.append('category_id', this.productForm.value.category_id);
    formData.append('description', this.productForm.value.description);

    if (this.imageFiles && this.imageFiles.length > 0) {
      for (let i = 0; i < this.imageFiles.length; i++) {
        formData.append(`image[${i}]`, this.imageFiles[i]);
      }
    }

    this.admin.create_product(formData).subscribe(
      res => {
        console.log(res);
        // do something with the response
      },
      error => {
        console.log(error);
        // do something with the error
      }
    );
  }

  // onFileSelected(event:any) {
  //   if (event.target.files.length > 0) {
  //     for (let i = 0; i < event.target.files.length; i++) {
  //       this.imageFiles.push(event.target.files[i]);
  //     }
  //   }
  // }

  // onFileSelected(event:any) {
  //   if (event.target.files.length > 0) {
  //     for (let i = 0; i < event.target.files.length; i++) {
  //       const reader = new FileReader(); // tạo mới đối tượng FileReader
  //       const file = event.target.files[i]; // lấy file được chọn
  //       reader.readAsDataURL(file); // đọc file dưới dạng URL
  //       reader.onload = () => { // xử lý khi đã đọc xong file
  //         const result = reader.result as string; // chuyển đổi kết quả đọc file về dạng chuỗi
  //         // hiển thị ảnh trước khi tải lên
  //         const image = document.createElement('img');
  //         image.src = result;
  //         image.width = 150; // đặt chiều rộng của ảnh
  //         document.getElementById('preview')!.appendChild(image); // thêm ảnh vào thẻ div có id là 'preview'
  //       };
  //       this.imageFiles.push(file);
  //     }
  //   }
  // }


  onFileSelected(event:any) {
    if (event.target.files.length > 0) {
        for (let i = 0; i < event.target.files.length; i++) {
            const reader = new FileReader(); // tạo mới đối tượng FileReader
            const file = event.target.files[i]; // lấy file được chọn
            reader.readAsDataURL(file); // đọc file dưới dạng URL
            reader.onload = () => { // xử lý khi đã đọc xong file
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
                    this.imageFiles.splice(this.imageFiles.indexOf(file), 1); // xóa file khỏi mảng
                };
                previewDiv.appendChild(deleteButton); // thêm nút X vào thẻ div
            };
            this.imageFiles.push(file);
        }
    }
}




}
