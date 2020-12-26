/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TempComponent } from './temp.component';

describe('TempComponent', () => {
  let component: TempComponent;
  let fixture: ComponentFixture<TempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
