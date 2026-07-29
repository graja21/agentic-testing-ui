import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import {
  DeleteAllExecutionsResponse,
  DeleteExecutionResponse,
  ExecutionSummary,
  PipelineExecution,
} from '../models/execution.model';

@Injectable({
  providedIn: 'root',
})
export class ExecutionService {
  private readonly apiUrl =
    'http://127.0.0.1:8000/api/executions';

  constructor(
    private readonly http: HttpClient,
  ) {}

  getSummary(): Observable<ExecutionSummary> {
    return this.http.get<ExecutionSummary>(
      `${this.apiUrl}/summary`,
    );
  }

  getExecutions(
    limit = 20,
    skip = 0,
  ): Observable<PipelineExecution[]> {
    const params = new HttpParams()
      .set('limit', limit.toString())
      .set('skip', skip.toString());

    return this.http.get<PipelineExecution[]>(
      this.apiUrl,
      {
        params,
      },
    );
  }

  getExecutionById(
    executionId: string,
  ): Observable<PipelineExecution> {
    return this.http.get<PipelineExecution>(
      `${this.apiUrl}/${executionId}`,
    );
  }

  deleteExecution(
    executionId: string,
  ): Observable<DeleteExecutionResponse> {
    return this.http.delete<DeleteExecutionResponse>(
      `${this.apiUrl}/${executionId}`,
    );
  }

  deleteAllExecutions():
    Observable<DeleteAllExecutionsResponse> {
    return this.http.delete<DeleteAllExecutionsResponse>(
      this.apiUrl,
    );
  }
}