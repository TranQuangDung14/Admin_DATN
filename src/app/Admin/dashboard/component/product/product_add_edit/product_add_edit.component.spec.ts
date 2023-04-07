/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Product_add_editComponent } from './product_add_edit.component';

describe('Product_add_editComponent', () => {
  let component: Product_add_editComponent;
  let fixture: ComponentFixture<Product_add_editComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Product_add_editComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Product_add_editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
