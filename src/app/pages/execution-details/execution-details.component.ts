import {
  Component,
  OnInit,
} from '@angular/core';

import {
  CommonModule,
} from '@angular/common';

import {
  ActivatedRoute,
  Router,
  RouterLink,
} from '@angular/router';

import {
  finalize,
} from 'rxjs/operators';

import {
  ExecutionService,
} from '../../services/execution.service';

import {
  ExecutionTestResult,
  PipelineExecution,
} from '../../models/execution.model';

@Component({
  selector: 'app-execution-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl:
    './execution-details.component.html',
  styleUrl:
    './execution-details.component.css',
})
export class ExecutionDetailsComponent
  implements OnInit {
  execution: PipelineExecution | null = null;

  loading = false;
  deleting = false;
  errorMessage = '';

  private executionId = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly executionService:
      ExecutionService,
  ) {}

  ngOnInit(): void {
    this.executionId =
      this.route.snapshot.paramMap.get('id')
      ?? '';

    if (!this.executionId) {
      this.errorMessage =
        'Execution identifier is missing.';

      return;
    }

    this.loadExecution();
  }

  loadExecution(): void {
    this.loading = true;
    this.errorMessage = '';

    this.executionService
      .getExecutionById(this.executionId)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: (
          execution: PipelineExecution,
        ) => {
          this.execution = execution;
        },

        error: (error: unknown) => {
          console.error(
            'Execution details error:',
            error,
          );

          this.execution = null;

          this.errorMessage =
            'Unable to load this execution.';
        },
      });
  }

  deleteExecution(): void {
    if (!this.execution) {
      return;
    }

    const confirmed = window.confirm(
      'Delete this execution permanently?',
    );

    if (!confirmed) {
      return;
    }

    this.deleting = true;
    this.errorMessage = '';

    this.executionService
      .deleteExecution(this.execution.id)
      .pipe(
        finalize(() => {
          this.deleting = false;
        }),
      )
      .subscribe({
        next: () => {
          void this.router.navigate([
            '/reports',
          ]);
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

  getExecutionStatusClass(): string {
    if (!this.execution) {
      return '';
    }

    if (this.execution.errors > 0) {
      return 'error';
    }

    if (this.execution.pass_rate >= 80) {
      return 'success';
    }

    if (this.execution.pass_rate >= 50) {
      return 'warning';
    }

    return 'danger';
  }

  getExecutionStatusLabel(): string {
    if (!this.execution) {
      return '';
    }

    if (this.execution.errors > 0) {
      return 'Error';
    }

    if (this.execution.pass_rate >= 80) {
      return 'Passed';
    }

    if (this.execution.pass_rate >= 50) {
      return 'Partial';
    }

    return 'Failed';
  }

  getVerdictClass(
    result: ExecutionTestResult,
  ): string {
    return result.verdict.toLowerCase();
  }

  trackResult(
    index: number,
    result: ExecutionTestResult,
  ): string {
    return result.test_case_id;
  }

  getScreenshotUrl(
    screenshotPath: string | null,
  ): string | null {
    if (!screenshotPath) {
      return null;
    }

    const normalizedPath =
      screenshotPath.replaceAll('\\', '/');

    return `http://127.0.0.1:8000/${normalizedPath}`;
  }

  getHtmlReportUrl(): string | null {
    const reportPath =
      this.execution?.report
        ?.html_report_path;

    if (!reportPath) {
      return null;
    }

    const normalizedPath =
      reportPath.replaceAll('\\', '/');

    return `http://127.0.0.1:8000/${normalizedPath}`;
  }

  getJsonReportUrl(): string | null {
    const reportPath =
      this.execution?.report
        ?.json_report_path;

    if (!reportPath) {
      return null;
    }

    const normalizedPath =
      reportPath.replaceAll('\\', '/');

    return `http://127.0.0.1:8000/${normalizedPath}`;
  }
}