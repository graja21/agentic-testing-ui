export type ExecutionMode = 'api' | 'web';

export type TestVerdict =
  | 'PASS'
  | 'FAIL'
  | 'ERROR';

export interface ExecutionTestResult {
  test_case_id: string;
  execution_mode: ExecutionMode;

  user_input: string;
  expected_response: string;
  actual_response: string | null;

  execution_status: string;

  verdict: TestVerdict;
  score: number;
  reason: string;

  detected_failures: string[];

  screenshot_path: string | null;
  execution_time_ms: number | null;

  error: string | null;
}

export interface ExecutionReport {
  json_report_name?: string | null;
  json_report_path?: string | null;

  html_report_name?: string | null;
  html_report_path?: string | null;

  generated_at?: string | null;

  summary?: Record<string, unknown>;
}

export interface PipelineExecution {
  id: string;

  status: string;
  execution_mode: ExecutionMode;

  specification: string;

  requested_tests: number;
  generated_tests: number;
  executed_tests: number;
  skipped_tests: number;

  passed: number;
  failed: number;
  errors: number;

  pass_rate: number;

  results: ExecutionTestResult[];
  report: ExecutionReport;

  created_at: string;
}

export interface ExecutionSummary {
  total_executions: number;
  total_tests: number;

  passed_tests: number;
  failed_tests: number;
  error_tests: number;

  average_pass_rate: number;
}

export interface DeleteExecutionResponse {
  message: string;
}

export interface DeleteAllExecutionsResponse {
  message: string;
  deleted_count: number;
}