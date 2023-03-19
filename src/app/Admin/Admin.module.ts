import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './dashboard/component/index/index.component';
import { SharedModule } from '../shared/shared.module';

const router_home:Routes=[
  {
  path:"",
  component: DashboardComponent,
  children:[
    {
      path:"",
      component:IndexComponent,
    },
    // {
    //   path:"chi-tiet-san-pham/:id",
    //   component:DetailComponent,
    // },

  ]
}
]
@NgModule({

  declarations: [
    DashboardComponent,
    IndexComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,

    RouterModule.forChild(router_home)
  ],
})
export class AdminModule { }
