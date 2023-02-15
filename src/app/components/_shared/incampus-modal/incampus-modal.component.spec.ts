import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncampusModalComponent } from './incampus-modal.component';

describe('IncampusModalComponent', () => {
  let component: IncampusModalComponent;
  let fixture: ComponentFixture<IncampusModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncampusModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncampusModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
