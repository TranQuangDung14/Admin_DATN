/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Product_editComponent } from './product_edit.component';

describe('Product_editComponent', () => {
  let component: Product_editComponent;
  let fixture: ComponentFixture<Product_editComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Product_editComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Product_editComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
