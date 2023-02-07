import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncampusEventComponent } from './incampus-event.component';

describe('IncampusEventComponent', () => {
  let component: IncampusEventComponent;
  let fixture: ComponentFixture<IncampusEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncampusEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncampusEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
