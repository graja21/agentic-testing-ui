import {
  Component,
  OnInit,
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  RouterLink,
} from '@angular/router';

import {
  forkJoin,
} from 'rxjs';

import {
  finalize,
} from 'rxjs/operators';

import {
  ExecutionService,
} from '../../services/execution.service';

import {
  ExecutionSummary,
  PipelineExecution,
} from '../../models/execution.model';

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
  ],

  templateUrl: './dashboard.component.html',

  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  summary: ExecutionSummary = {
    total_executions: 0,
    total_tests: 0,
    passed_tests: 0,
    failed_tests: 0,
    error_tests: 0,
    average_pass_rate: 0,
  };

  recentExecutions: PipelineExecution[] = [];

  loading = false;

  errorMessage = '';

  constructor(
    private readonly executionService:
      ExecutionService,
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;
    this.errorMessage = '';

    forkJoin({
      summary:
        this.executionService.getSummary(),

      executions:
        this.executionService.getExecutions(
          5,
          0,
        ),
    })
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: ({
          summary,
          executions,
        }: {
          summary: ExecutionSummary;
          executions: PipelineExecution[];
        }) => {
          this.summary = summary;
          this.recentExecutions = executions;
        },

        error: (error: unknown) => {
          console.error(
            'Dashboard loading error:',
            error,
          );

          this.errorMessage =
            'Unable to load dashboard data. Make sure the FastAPI backend and MongoDB are running.';
        },
      });
  }

  get totalFailedTests(): number {
    return (
      this.summary.failed_tests
      + this.summary.error_tests
    );
  }

  getPassRateClass(
    passRate: number,
  ): string {
    if (passRate >= 80) {
      return 'success';
    }

    if (passRate >= 50) {
      return 'warning';
    }

    return 'danger';
  }

  trackExecution(
    index: number,
    execution: PipelineExecution,
  ): string {
    return execution.id;
  }
}