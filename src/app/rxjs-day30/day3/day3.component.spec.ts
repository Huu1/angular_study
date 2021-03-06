/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Day3Component } from './day3.component';

describe('Day3Component', () => {
  let component: Day3Component;
  let fixture: ComponentFixture<Day3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Day3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Day3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
