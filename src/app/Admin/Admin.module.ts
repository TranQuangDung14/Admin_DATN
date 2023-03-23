import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './dashboard/component/index/index.component';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './dashboard/component/product/product.component';
import { CategoryComponent } from './dashboard/component/category/category.component';

const router_home:Routes=[
  {
  path:"",
  component: DashboardComponent,
  children:[
    {
      path:"dashboard",
      component:IndexComponent,
    },
    {
      path:"product",
      component:ProductComponent,
    },
    {
      path:"category",
      component:CategoryComponent,
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
    ProductComponent,
    // CategoryComponent

  ],
  imports: [
    CommonModule,
    SharedModule,

    RouterModule.forChild(router_home)
  ],
})
export class AdminModule { }
