import { environment } from './../../../environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = 'http://127.0.0.1:8000/api/';
  // public host = environment.BASE_API;
  constructor(private _http: HttpClient, public router: Router) {

  }
  getalldashboard(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'get_product');
  }
  //detail dữ liệu theo id
  get_detail(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'get_product/' + id);
  }


  // giỏ hàng
  // addToCart(product: Product) {
  //   let cartItems = localStorage.getItem('cartItems');

  //   if (cartItems) {
  //     let items: Product[] = JSON.parse(cartItems);
  //     items.push(product);
  //     localStorage.setItem('cartItems', JSON.stringify(items));
  //   } else {
  //     localStorage.setItem('cartItems', JSON.stringify([product]));
  //   }
  // }

}
