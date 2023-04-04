import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password:new FormControl(null, Validators.required),
  });
  errorMessage: string = '';
  constructor(private admin :ApiService , private router: Router) { }

  ngOnInit() {
  }

  loginProces()
  {
    if(this.form.invalid){
      return;
    }

    this.admin.login(this.form.value)
    .subscribe(data=>{
       console.log(data);
       console.log('đã vào');
      this.router.navigate(['/dashboard']).then(() => {
        window.location.reload();
      })}, error => {
      // Xử lý đăng nhập thất bại ở đây, ví dụ hiển thị thông báo lỗi
      console.log(error);
      console.log('loi');
      this.errorMessage = error.message;
    });
  }
}
