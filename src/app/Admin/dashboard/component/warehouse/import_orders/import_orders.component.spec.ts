/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Import_ordersComponent } from './import_orders.component';

describe('Import_ordersComponent', () => {
  let component: Import_ordersComponent;
  let fixture: ComponentFixture<Import_ordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Import_ordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Import_ordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
