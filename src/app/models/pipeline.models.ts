export type ExecutionMode = 'api' | 'web' | 'auto';
export type TestVerdict = 'PASS' | 'FAIL' | 'ERROR';

export interface RunPipelineRequest {
  specification: string;
  number_of_tests: number;
  execution_mode: ExecutionMode;

  endpoint_url?: string | null;
  request_field?: string;
  response_field?: string | null;
  headers?: Record<string, string>;
  extra_payload?: Record<string, unknown>;

  page_url?: string | null;
  input_selector?: string | null;
  send_button_selector?: string | null;
  response_selector?: string | null;
  wait_after_send_ms?: number;
  headless?: boolean;
}

export interface PipelineTestResult {
  test_case_id: string;
  execution_mode: 'api' | 'web';

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

export interface PipelineReport {
  json_report_name?: string;
  json_report_path?: string;

  html_report_name?: string;
  html_report_path?: string;

  generated_at?: string;
  summary?: Record<string, unknown>;
}

export interface RunPipelineResult {
  status: string;
  execution_mode: 'api' | 'web';

  requested_tests: number;
  generated_tests: number;
  executed_tests: number;
  skipped_tests: number;

  passed: number;
  failed: number;
  errors: number;

  pass_rate: number;

  results: PipelineTestResult[];
  report: PipelineReport;
}