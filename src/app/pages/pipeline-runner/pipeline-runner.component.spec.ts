import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PipelineRunnerComponent } from './pipeline-runner.component';

describe('PipelineRunnerComponent', () => {
  let component: PipelineRunnerComponent;
  let fixture: ComponentFixture<PipelineRunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PipelineRunnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PipelineRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
