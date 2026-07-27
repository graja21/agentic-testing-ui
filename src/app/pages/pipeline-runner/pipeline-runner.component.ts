import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { PipelineService } from '../../services/pipeline.service';

import {
  ExecutionMode,
  RunPipelineRequest,
  RunPipelineResult
} from '../../models/pipeline.models';

@Component({
  selector: 'app-pipeline-runner',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
 templateUrl: './pipeline-runner.component.html',
styleUrl: './pipeline-runner.component.css'
})
export class PipelineRunnerComponent {
pipelineForm: FormGroup;

  loading = false;
  errorMessage = '';
  result: RunPipelineResult | null = null;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly pipelineService: PipelineService
  ) {
    this.pipelineForm = this.formBuilder.group({
      specification: [
        'An e-commerce chatbot answers questions about refunds, orders and deliveries.',
        [
          Validators.required,
          Validators.minLength(5)
        ]
      ],

      number_of_tests: [
        1,
        [
          Validators.required,
          Validators.min(1),
          Validators.max(20)
        ]
      ],

      execution_mode: [
        'web',
        Validators.required
      ],

      endpoint_url: [
        'http://127.0.0.1:8000/demo/chatbot'
      ],

      request_field: [
        'message'
      ],

      response_field: [
        'answer'
      ],

      page_url: [
        'http://127.0.0.1:8000/demo/web-chatbot'
      ],

      input_selector: [
        '#chat-input'
      ],

      send_button_selector: [
        '#send-button'
      ],

      response_selector: [
        '.bot-message'
      ],

      wait_after_send_ms: [
        1500,
        [
          Validators.min(0),
          Validators.max(30000)
        ]
      ],

      headless: [
        true
      ]
    });
  }

  get executionMode(): ExecutionMode {
    return this.pipelineForm.get(
      'execution_mode'
    )?.value as ExecutionMode;
  }

  runPipeline(): void {
    this.errorMessage = '';
    this.result = null;

    if (this.pipelineForm.invalid) {
      this.pipelineForm.markAllAsTouched();
      return;
    }

    const formValue = this.pipelineForm.getRawValue();

    const request: RunPipelineRequest = {
      specification: formValue.specification,
      number_of_tests: Number(
        formValue.number_of_tests
      ),
      execution_mode: formValue.execution_mode,

      request_field:
        formValue.request_field || 'message',

      response_field:
        formValue.response_field || null,

      headers: {},
      extra_payload: {},

      wait_after_send_ms: Number(
        formValue.wait_after_send_ms
      ),

      headless: Boolean(
        formValue.headless
      )
    };

    if (
      formValue.execution_mode === 'api' ||
      formValue.execution_mode === 'auto'
    ) {
      request.endpoint_url =
        formValue.endpoint_url || null;
    }

    if (
      formValue.execution_mode === 'web' ||
      formValue.execution_mode === 'auto'
    ) {
      request.page_url =
        formValue.page_url || null;

      request.input_selector =
        formValue.input_selector || null;

      request.send_button_selector =
        formValue.send_button_selector || null;

      request.response_selector =
        formValue.response_selector || null;
    }

    this.loading = true;

    this.pipelineService
      .runPipeline(request)
      .subscribe({
        next: (response) => {
          this.result = response;
          this.loading = false;
        },

        error: (error) => {
          console.error(
            'Pipeline error:',
            error
          );

          this.errorMessage =
            error?.error?.detail ||
            error?.message ||
            'Pipeline execution failed.';

          this.loading = false;
        }
      });
  }

  resetForm(): void {
    this.result = null;
    this.errorMessage = '';

    this.pipelineForm.reset({
      specification:
        'An e-commerce chatbot answers questions about refunds, orders and deliveries.',

      number_of_tests: 1,
      execution_mode: 'web',

      endpoint_url:
        'http://127.0.0.1:8000/demo/chatbot',

      request_field: 'message',
      response_field: 'answer',

      page_url:
        'http://127.0.0.1:8000/demo/web-chatbot',

      input_selector: '#chat-input',
      send_button_selector: '#send-button',
      response_selector: '.bot-message',

      wait_after_send_ms: 1500,
      headless: true
    });
  }

  verdictClass(
    verdict: string
  ): string {
    switch (verdict) {
      case 'PASS':
        return 'verdict-pass';

      case 'FAIL':
        return 'verdict-fail';

      default:
        return 'verdict-error';
    }
  }
}