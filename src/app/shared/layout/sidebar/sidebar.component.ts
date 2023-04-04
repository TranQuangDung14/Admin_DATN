import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  name_task :any;
  constructor(private admin :ApiService,private router: Router) { }

  ngOnInit() {
  }
  onlogout(){
    this.admin.logout().subscribe(data=>{
      localStorage.removeItem('profanis_auth');
      this.router.navigate(['/login']);
    });
    //
  }

}
