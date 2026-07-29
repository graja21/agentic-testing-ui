import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionDetailsComponent } from './execution-details.component';

describe('ExecutionDetailsComponent', () => {
  let component: ExecutionDetailsComponent;
  let fixture: ComponentFixture<ExecutionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutionDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
