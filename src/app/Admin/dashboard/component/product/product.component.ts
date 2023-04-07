import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../core/services/api.service';
import { ComponentService } from '../../../../core/services/component.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  title='Sản phẩm';
  constructor(
    private admin: ApiService,
    private data_service: ComponentService,
  ) { }

  ngOnInit() {
    this.send_title();
  }
  // gửi title đi
  send_title() {
    this.data_service.Title_message(this.title);
    // console.log('data',this.data_service.Title_message('Danh111'));
  }

}
