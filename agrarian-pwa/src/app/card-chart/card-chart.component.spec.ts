/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CardChartComponent } from './card-chart.component';

describe('CardChartComponent', () => {
  let component: CardChartComponent;
  let fixture: ComponentFixture<CardChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
