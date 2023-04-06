import { environment } from './../../../environments/environment.prod';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private API_URL = 'http://127.0.0.1:8000/api/';
  // public host = environment.BASE_API;

  public code_tokens = `Bearer ${localStorage.getItem('profanis_auth')}`;

  private _islog = new BehaviorSubject<boolean>(false);
  public readonly TOKEN_NAME = 'profanis_auth';
  islog = this._islog.asObservable();
  get token() {
    return localStorage.getItem(this.TOKEN_NAME)!;
  }
  constructor(private _http: HttpClient, public router: Router) {
    //
    this._islog.next(!!this.token);
  }
  // hàm kiểm tra
  isLoggedIn() {
    const token = localStorage.getItem('profanis_auth');
    return token !== null;
  }
  // login(data: any): Observable<any> {
  //   return this._http.post<any>(this.API_URL + 'login', data);
  // }
  // getalluser(): Observable<any> {
  //   return this._http.get<any>(this.API_URL + 'user/', {
  //     headers: {
  //       Authorization: this.code_tokens
  //     }
  //   });
  // }

  login(data: any) {
    return this._http.post<any>(this.API_URL + 'login', data).pipe(
      tap((respose: any) => {
        console.log('vao');
        this._islog.next(true);
        localStorage.setItem(this.TOKEN_NAME, respose.access_token);

        console.log(respose.access_token);
        console.log(this.TOKEN_NAME, respose.access_token);
      })
    );
  }
  logout(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'logout', {
      headers: {
        Authorization: this.code_tokens,
      },
    });
  }
  register(data: any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'register', data);
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

  // category-product
  getallcategory_product(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'category_product/', {
      headers: {
        Authorization: this.code_tokens,
      },
    });
  }
  // thêm mới danh mục
  create_category_product(data: any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'category_product/', data, {
      headers: {
        Authorization: this.code_tokens,
      },
    });
  }
  get_category(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'category_product/' + id, {
      headers: {
        Authorization: this.code_tokens,
      },
    });
  }
  update_category(id: number, data: any): Observable<any> {
    return this._http.put<any>(this.API_URL + 'category_product/' + id, data, {
      headers: {
        Authorization: this.code_tokens,
      },
    });
  }
  delete_category(id: number): Observable<any> {
    return this._http.delete<any>(this.API_URL + 'category_product/' + id, {
      headers: {
        Authorization: this.code_tokens,
      },
    });
  }
}
