import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  private subcription :Subscription;
  category_product :any;
  supplier: any;

  constructor(private admin :ApiService) { }

  ngOnInit() {
    this.get_all_category_product();
  }

  get_all_category_product(){
    this.subcription = this.admin.getallcategory_product()
    .subscribe((data:any)=>{
      console.log('category_product',data.category_product);
      console.log('supplier',data.supplier);
      console.log('category',data.category)
      this.category_product=data.category_product;
      this.supplier=data.supplier;
    },error =>{
      console.log(error);

    }
    )
  }
}
