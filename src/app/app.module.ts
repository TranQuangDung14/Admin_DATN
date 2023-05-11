import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { SharedModule } from './shared/shared.module';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CategoryComponent } from './Admin/dashboard/component/category/category.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { CurrencyPipe, DatePipe } from '@angular/common';
// import { CKEditorModule } from 'ckeditor4-angular';

@NgModule({
  declarations: [
    AppComponent,
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CKEditorModule,
    CurrencyPipe,
    // BrowserAnimationsModule,
    // CommonModule
    // SharedModule,
    ToastrModule.forRoot()
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
