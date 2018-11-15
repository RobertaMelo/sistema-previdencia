import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadListComponent } from './head-list.component';

describe('HeadListComponent', () => {
  let component: HeadListComponent;
  let fixture: ComponentFixture<HeadListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
