import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './dashboard/component/index/index.component';
import { SharedModule } from '../shared/shared.module';
import { ProductComponent } from './dashboard/component/product/product.component';
import { CategoryComponent } from './dashboard/component/category/category.component';
import { HttpClientModule } from '@angular/common/http';
// import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './dashboard/account/login/login.component';
import { RegisterComponent } from './dashboard/account/register/register.component';
import { LogoutComponent } from './dashboard/account/logout/logout.component';

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

  ],

},
{
  path:"login",
  component:LoginComponent,
},
{
  path:"logout",
  component:LogoutComponent,
},
{
  path:"register",
  component:RegisterComponent,
},
]
@NgModule({

  declarations: [
    // LogoutComponent,
    DashboardComponent,
    IndexComponent,
    ProductComponent,
    CategoryComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,

  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    // NgxPaginationModule,
    RouterModule.forChild(router_home)
  ],
})
export class AdminModule { }
