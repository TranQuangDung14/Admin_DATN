import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../../core/services/api.service';

@Component({
  selector: 'app-product_add',
  templateUrl: './product_add.component.html',
  styleUrls: ['./product_add.component.css']
})
export class Product_addComponent implements OnInit {

  productForm: FormGroup;
  imageFiles: File[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private admin: ApiService
  ) { }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      default_price: ['', Validators.required],
      price: ['', Validators.required],
      category_id: [''],
      description: [''],
      image: [null]
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('default_price', this.productForm.value.default_price);
    formData.append('price', this.productForm.value.price);
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

  onFileSelected(event:any) {
    if (event.target.files.length > 0) {
      for (let i = 0; i < event.target.files.length; i++) {
        this.imageFiles.push(event.target.files[i]);
      }
    }
  }
}
