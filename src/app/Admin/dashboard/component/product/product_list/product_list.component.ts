import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ComponentService } from 'src/app/core/services/component.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product_list',
  templateUrl: './product_list.component.html',
  styleUrls: ['./product_list.component.css']
})
export class Product_listComponent implements OnInit {
  private subscription: Subscription;
  // Mục khai báo biến
  category_product: any;
  product :any;
  // supplier: any;
  title='Sản phẩm';
  // id :any;
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
  ) { }

  ngOnInit() {
    this.send_title();
    this.get_all_product();
  }

    // gửi title đi
    send_title() {
      this.data_service.Title_message(this.title);
      // console.log('data',this.data_service.Title_message('Danh111'));
    }

    get_all_product() {
      this.subscription = this.admin.get_all_product()
        .subscribe((data: any) => {
          console.log('san pham',data.product);
          console.log(data.category_product);

          this.product = data.product;
          this.category_product = data.category_product;
        }, error => {
          console.log(error);

        }
        )
    }


    //phân trang
    ontableDataChange(event: any) {
      this.page = event;
      this.get_all_product();
    }
    ontableSizeChange(event: any): void {
      this.tableSize = event.target.value;
      this.page = 1;
      this.get_all_product();
    }
}

