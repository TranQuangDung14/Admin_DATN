/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Product_addComponent } from './product_add.component';

describe('Product_addComponent', () => {
  let component: Product_addComponent;
  let fixture: ComponentFixture<Product_addComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Product_addComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Product_addComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
