import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectRouteComponent } from './subject-route.component';

describe('SubjectRouteComponent', () => {
  let component: SubjectRouteComponent;
  let fixture: ComponentFixture<SubjectRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectRouteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
