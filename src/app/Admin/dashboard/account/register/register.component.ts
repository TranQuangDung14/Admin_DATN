import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  private subscription: Subscription;
  public form = new FormGroup({
    email: new FormControl(null, Validators.required),
    name: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });
  constructor(private admin: ApiService, private router: Router) {}

  ngOnInit() {}
  register() {
    this.admin.register(this.form.value).subscribe((data: any) => {
      console.log('tạo thành công',data);
      alert('chúc mừng bạn đã tạo tài khoản thành công ');
      this.router.navigate(['/login']);
    });
  }
}
