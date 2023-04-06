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
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuardGuard } from '../core/guards/auth-guard.guard';
import { BlockPageLoginGuard } from '../core/guards/block-page-login.guard';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const router_home:Routes=[
  {
  path:"",
  component: DashboardComponent,
  canActivate: [AuthGuardGuard],
  children:[
    {
      path:"dashboard",
      component:IndexComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"product",
      component:ProductComponent,
      canActivate: [AuthGuardGuard],
    },
    {
      path:"category",
      component:CategoryComponent,
      canActivate: [AuthGuardGuard],
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
  canActivate: [BlockPageLoginGuard],
},
// {
//   path:"logout",
//   component:LogoutComponent,
// },
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

  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    // BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    // NgxPaginationModule,
    RouterModule.forChild(router_home)
  ],
})
export class AdminModule { }
