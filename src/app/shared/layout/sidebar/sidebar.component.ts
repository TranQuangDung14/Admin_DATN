import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  // name_task: any;
  constructor(
    private admin: ApiService,
    private router: Router,
    private toastr: ToastrService
    ) {}

  ngOnInit() {}
  onlogout() {
    // alert()
    const confirmed = confirm('Bạn có muốn đăng xuất không?');
    if (confirmed) {
      this.admin.logout().subscribe((data) => {
        localStorage.removeItem('profanis_auth');
        this.router.navigate(['/login']);
        this.toastr.success('Bạn đã đăng xuất thành công !!')
      });
    } else {
    }
    //
  }
}
