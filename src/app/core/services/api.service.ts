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
  // get_detail(id: number): Observable<any> {
  //   return this._http.get<any>(this.API_URL + 'get_product/' + id);
  // }

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

  // Danh mục sản phẩm
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
   //customer
   get_all_customer(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'customer/', {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  create_customer(data:any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'customer/',data, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  get_customer(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'customer/' + id, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  update_customer(id: number, data: any): Observable<any> {
    return this._http.put<any>(this.API_URL + 'customer/' + id, data, {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  delete_customer(id: number): Observable<any> {
    return this._http.delete<any>(this.API_URL + 'customer/' + id
      ,
      {
        headers: {
          Authorization: this.code_tokens
        }
      }
    );
  }


  //info_supplier
  get_all_info_supplier(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'info_supplier/', {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  create_info_supplier(data:any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'info_supplier/',data, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  get_info_supplier(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'info_supplier/' + id, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  update_info_supplier(id: number, data: any): Observable<any> {
    return this._http.put<any>(this.API_URL + 'info_supplier/' + id, data, {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  delete_info_supplier(id: number): Observable<any> {
    return this._http.delete<any>(this.API_URL + 'info_supplier/' + id
      ,
      {
        headers: {
          Authorization: this.code_tokens
        }
      }
    );
  }


   //staff
   get_all_staff(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'staff/', {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  create_staff(data:any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'staff/',data, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  get_staff(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'staff/' + id, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  update_staff(id: number, data: any): Observable<any> {
    return this._http.put<any>(this.API_URL + 'staff/' + id, data, {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  delete_staff(id: number): Observable<any> {
    return this._http.delete<any>(this.API_URL + 'staff/' + id
      ,
      {
        headers: {
          Authorization: this.code_tokens
        }
      }
    );
  }


   //order_history
   get_all_order_history(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'order_history/', {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  create_order_history(data:any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'order_history/',data, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  get_order_history(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'order_history/' + id, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  update_order_history(id: number, data: any): Observable<any> {
    return this._http.put<any>(this.API_URL + 'order_history/' + id, data, {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  delete_order_history(id: number): Observable<any> {
    return this._http.delete<any>(this.API_URL + 'order_history/' + id
      ,
      {
        headers: {
          Authorization: this.code_tokens
        }
      }
    );
  }


   //order
   get_all_order(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'order/', {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  create_order(data:any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'order/',data, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  get_order(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'order/' + id, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  update_order(id: number, data: any): Observable<any> {
    return this._http.put<any>(this.API_URL + 'order/' + id, data, {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  delete_order(id: number): Observable<any> {
    return this._http.delete<any>(this.API_URL + 'order/' + id
      ,
      {
        headers: {
          Authorization: this.code_tokens
        }
      }
    );
  }


   //posts
   get_all_posts(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'posts/', {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  create_posts(data:any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'posts/',data, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  get_posts(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'posts/' + id, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  update_posts(id: number, data: any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'posts/' + id, data, {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  delete_posts(id: number): Observable<any> {
    return this._http.delete<any>(this.API_URL + 'posts/' + id
      ,
      {
        headers: {
          Authorization: this.code_tokens
        }
      }
    );
  }
   //product_supplier
   get_all_product_supplier(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'product_supplier/', {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  create_product_supplier(data:any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'product_supplier/',data, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  get_product_supplier(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'product_supplier/' + id, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  update_product_supplier(id: number, data: any): Observable<any> {
    return this._http.put<any>(this.API_URL + 'product_supplier/' + id, data, {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  delete_product_supplier(id: number): Observable<any> {
    return this._http.delete<any>(this.API_URL + 'product_supplier/' + id
      ,
      {
        headers: {
          Authorization: this.code_tokens
        }
      }
    );
  }
   //product
   get_all_product(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'product/', {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  //them sản phẩm
  create_product(data:any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'product/',data,{
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  get_product(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'product/' + id, {
      headers: {
        Authorization: this.code_tokens,
        // 'Content-Type': 'multipart/form-data'
      },
      // {  var formData = new FormData(),
      //   formData.append('file', this.postForm.value)
      // }

    })
  }
     // 'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data'
  update_product(id: number, data :any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'product/' + id, data, {
      headers: {
        Authorization: this.code_tokens,
        // 'Content-Type': 'application/json'
        // 'Content-Type': 'multipart/form-data'
      }
    });
  }
  delete_product(id: number): Observable<any> {
    return this._http.delete<any>(this.API_URL + 'product/' + id
      ,
      {
        headers: {
          Authorization: this.code_tokens
        }
      }
    );
  }
   //transport
   get_all_transport(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'transport/', {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  create_transport(data:any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'transport/',data, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  get_transport(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'transport/' + id, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  update_transport(id: number, data: any): Observable<any> {
    return this._http.put<any>(this.API_URL + 'transport/' + id, data, {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  delete_transport(id: number): Observable<any> {
    return this._http.delete<any>(this.API_URL + 'transport/' + id
      ,
      {
        headers: {
          Authorization: this.code_tokens
        }
      }
    );
  }


   //type_posts
   get_all_type_posts(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'type_posts/', {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  create_type_posts(data:any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'type_posts/',data, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  get_type_posts(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'type_posts/' + id, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  update_type_posts(id: number, data: any): Observable<any> {
    return this._http.put<any>(this.API_URL + 'type_posts/' + id, data, {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  delete_type_posts(id: number): Observable<any> {
    return this._http.delete<any>(this.API_URL + 'type_posts/' + id
      ,
      {
        headers: {
          Authorization: this.code_tokens
        }
      }
    );
  }
   //type_video
   get_all_type_video(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'type_video/', {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  create_type_video(data:any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'type_video/',data, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  get_type_video(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'type_video/' + id, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  update_type_video(id: number, data: any): Observable<any> {
    return this._http.put<any>(this.API_URL + 'type_video/' + id, data, {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  delete_type_video(id: number): Observable<any> {
    return this._http.delete<any>(this.API_URL + 'type_video/' + id
      ,
      {
        headers: {
          Authorization: this.code_tokens
        }
      }
    );
  }
   //video
   get_all_video(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'video/', {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  create_video(data:any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'video/',data, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  get_video(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'video/' + id, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  update_video(id: number, data: any): Observable<any> {
    return this._http.put<any>(this.API_URL + 'video/' + id, data, {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  delete_video(id: number): Observable<any> {
    return this._http.delete<any>(this.API_URL + 'video/' + id
      ,
      {
        headers: {
          Authorization: this.code_tokens
        }
      }
    );
  }
   //warehouse
   get_all_warehouse(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'warehouse/', {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  create_warehouse(data:any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'warehouse/',data, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  get_warehouse(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'warehouse/' + id, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  update_warehouse(id: number, data: any): Observable<any> {
    return this._http.put<any>(this.API_URL + 'warehouse/' + id, data, {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  delete_warehouse(id: number): Observable<any> {
    return this._http.delete<any>(this.API_URL + 'warehouse/' + id
      ,
      {
        headers: {
          Authorization: this.code_tokens
        }
      }
    );
  }
   //Thương hiệu
   get_all_brands(): Observable<any> {
    return this._http.get<any>(this.API_URL + 'brands/', {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  create_brands(data:any): Observable<any> {
    return this._http.post<any>(this.API_URL + 'brands/',data, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  get_brands(id: number): Observable<any> {
    return this._http.get<any>(this.API_URL + 'brands/' + id, {
      headers: {
        Authorization: this.code_tokens
      }
    })
  }
  update_brands(id: number, data: any): Observable<any> {
    return this._http.put<any>(this.API_URL + 'brands/' + id, data, {
      headers: {
        Authorization: this.code_tokens
      }
    });
  }
  delete_brands(id: number): Observable<any> {
    return this._http.delete<any>(this.API_URL + 'brands/' + id
      ,
      {
        headers: {
          Authorization: this.code_tokens
        }
      }
    );
  }

}
