import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  RunPipelineRequest,
  RunPipelineResult
} from '../models/pipeline.models';

@Injectable({
  providedIn: 'root'
})
export class PipelineService {
  private readonly apiUrl = 'http://127.0.0.1:8000';

  constructor(
    private readonly http: HttpClient
  ) {}

  runPipeline(
    request: RunPipelineRequest
  ): Observable<RunPipelineResult> {
    return this.http.post<RunPipelineResult>(
      `${this.apiUrl}/api/run`,
      request
    );
  }
}