import {
  Component,
  OnInit,
} from '@angular/core';

import {
  CommonModule,
} from '@angular/common';

import {
  RouterLink,
} from '@angular/router';

import {
  finalize,
} from 'rxjs/operators';

import {
  ExecutionService,
} from '../../services/execution.service';

import {
  PipelineExecution,
} from '../../models/execution.model';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent implements OnInit {
  executions: PipelineExecution[] = [];

  loading = false;
  deletingId: string | null = null;

  errorMessage = '';
  successMessage = '';

  constructor(
    private readonly executionService:
      ExecutionService,
  ) {}

  ngOnInit(): void {
    this.loadExecutions();
  }

  loadExecutions(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.executionService
      .getExecutions(100, 0)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (
          executions: PipelineExecution[],
        ) => {
          this.executions = executions;
        },

        error: (error: unknown) => {
          console.error(
            'Execution history error:',
            error,
          );

          this.errorMessage =
            'Unable to load execution history.';
        },
      });
  }

  deleteExecution(
    execution: PipelineExecution,
  ): void {
    const confirmed = window.confirm(
      'Delete this execution permanently?',
    );

    if (!confirmed) {
      return;
    }

    this.deletingId = execution.id;
    this.errorMessage = '';
    this.successMessage = '';

    this.executionService
      .deleteExecution(execution.id)
      .pipe(
        finalize(() => {
          this.deletingId = null;
        }),
      )
      .subscribe({
        next: () => {
          this.executions =
            this.executions.filter(
              (item) =>
                item.id !== execution.id,
            );

          this.successMessage =
            'Execution deleted successfully.';
        },

        error: (error: unknown) => {
          console.error(
            'Execution deletion error:',
            error,
          );

          this.errorMessage =
            'Unable to delete this execution.';
        },
      });
  }

  clearHistory(): void {
    if (this.executions.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      'Delete all execution history?',
    );

    if (!confirmed) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.executionService
      .deleteAllExecutions()
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (response) => {
          this.executions = [];

          this.successMessage =
            `${response.deleted_count} execution(s) deleted.`;
        },

        error: (error: unknown) => {
          console.error(
            'History deletion error:',
            error,
          );

          this.errorMessage =
            'Unable to clear execution history.';
        },
      });
  }

  getStatusClass(
    execution: PipelineExecution,
  ): string {
    if (execution.errors > 0) {
      return 'error';
    }

    if (execution.pass_rate >= 80) {
      return 'success';
    }

    if (execution.pass_rate >= 50) {
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