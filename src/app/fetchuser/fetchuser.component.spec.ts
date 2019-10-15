import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchuserComponent } from './fetchuser.component';

describe('FetchuserComponent', () => {
  let component: FetchuserComponent;
  let fixture: ComponentFixture<FetchuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FetchuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
