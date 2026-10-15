import {
  Component,
  ElementRef,
  Injector,
  OnInit,
  afterNextRender,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  HlmAlertImports,
  HlmButtonImports,
  HlmCheckboxImports,
  HlmFieldImports,
  HlmInputImports,
  HlmRadioGroupImports,
} from '../../public-api';

type FieldName = 'name' | 'email' | 'contact' | 'topics' | 'consent';

/** Valid when at least one checkbox in the group is checked. */
function atLeastOneChecked(group: AbstractControl): ValidationErrors | null {
  return Object.values(group.value).some(Boolean) ? null : { atLeastOne: true };
}

@Component({
  selector: 'app-example-form',
  imports: [
    ReactiveFormsModule,
    HlmAlertImports,
    HlmButtonImports,
    HlmCheckboxImports,
    HlmFieldImports,
    HlmInputImports,
    HlmRadioGroupImports,
  ],
  template: `
    <form [formGroup]="form" novalidate (ngSubmit)="submit()">
      <div hlmFieldGroup>
        <h2 class="text-xl font-semibold">Form title</h2>

        @if (errors().length) {
          <div #errorSummary hlmAlert variant="danger" id="error-summary" tabindex="-1">
            <p hlmAlertTitle>There are errors in the form.</p>
            <div hlmAlertDescription>
              <ul>
                @for (field of errors(); track field) {
                  <li>
                    <a [href]="'#' + targets[field]" (click)="goToField($event, field)">{{
                      messages[field]
                    }}</a>
                  </li>
                }
              </ul>
            </div>
          </div>
        }

        <fieldset hlmFieldSet>
          <legend hlmFieldLegend><h3>About you</h3></legend>

          <div hlmFieldGroup>
            <div hlmField>
              <label hlmFieldLabel for="name">Name</label>
              <p hlmFieldDescription>Enter your full name.</p>
              <input
                hlmInput
                id="name"
                formControlName="name"
                type="text"
                placeholder="Jan Smit"
                required
                spellcheck="false"
                autocomplete="name"
              />
              <hlm-field-error>{{ messages.name }}</hlm-field-error>
            </div>

            <div hlmField>
              <label hlmFieldLabel for="email">Email address</label>
              <p hlmFieldDescription>Enter your email address.</p>
              <input
                hlmInput
                id="email"
                formControlName="email"
                type="email"
                placeholder="jan.smit@example.com"
                required
                spellcheck="false"
                autocomplete="email"
              />
              <hlm-field-error>{{ messages.email }}</hlm-field-error>
            </div>
          </div>
        </fieldset>

        <fieldset hlmFieldSet>
          <legend hlmFieldLegend><h3>Your preferences</h3></legend>

          <div hlmFieldGroup>
            <!-- Radio group: one choice. The fieldset's legend is the question. -->
            <fieldset hlmFieldSet>
              <legend hlmFieldLegend variant="label">How would you like us to contact you?</legend>
              <p hlmFieldDescription id="contact-description">
                We only contact you about your registration.
              </p>
              <hlm-radio-group formControlName="contact">
                @for (option of contactOptions; track option.value) {
                  <div hlmField orientation="horizontal">
                    <hlm-radio
                      [value]="option.value"
                      [inputId]="'contact-' + option.value"
                      [aria-describedby]="describedBy('contact')"
                      required
                    >
                      <hlm-radio-indicator indicator />
                    </hlm-radio>
                    <label hlmFieldLabel [for]="'contact-' + option.value">{{
                      option.label
                    }}</label>
                  </div>
                }
              </hlm-radio-group>
              @if (hasError('contact')) {
                <hlm-field-error id="contact-error">{{ messages.contact }}</hlm-field-error>
              }
            </fieldset>

            <!-- Checkbox group: one or more choices. -->
            <fieldset hlmFieldSet formGroupName="topics">
              <legend hlmFieldLegend variant="label">Which topics are you interested in?</legend>
              <p hlmFieldDescription id="topics-description">Choose one or more.</p>
              <div hlmFieldGroup>
                @for (option of topicOptions; track option.value) {
                  <div hlmField orientation="horizontal">
                    <hlm-checkbox
                      [formControlName]="option.value"
                      [inputId]="'topics-' + option.value"
                      [aria-describedby]="describedBy('topics')"
                      [forceInvalid]="hasError('topics')"
                    />
                    <label hlmFieldLabel [for]="'topics-' + option.value">{{ option.label }}</label>
                  </div>
                }
              </div>
              @if (hasError('topics')) {
                <hlm-field-error id="topics-error">{{ messages.topics }}</hlm-field-error>
              }
            </fieldset>
          </div>
        </fieldset>

        <!-- A single checkbox: its label is the statement you agree to. -->
        <div>
          <div hlmField orientation="horizontal">
            <hlm-checkbox
              formControlName="consent"
              inputId="consent"
              [aria-describedby]="hasError('consent') ? 'consent-error' : null"
              [forceInvalid]="hasError('consent')"
              required
            />
            <label hlmFieldLabel for="consent">I agree to the privacy statement.</label>
          </div>
          @if (hasError('consent')) {
            <hlm-field-error id="consent-error">{{ messages.consent }}</hlm-field-error>
          }
        </div>

        <div hlmField orientation="horizontal">
          <button hlmBtn type="submit">Submit</button>
        </div>
      </div>
    </form>
  `,
})
export class ExampleForm implements OnInit {
  private readonly injector = inject(Injector);
  private readonly errorSummary = viewChild<ElementRef<HTMLElement>>('errorSummary');

  /** Fields that are already invalid when the page loads, e.g. after server-side validation. */
  public readonly initialErrors = input<FieldName[]>([]);

  protected readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    contact: new FormControl<string | null>(null, { validators: [Validators.required] }),
    topics: new FormGroup(
      {
        research: new FormControl(false, { nonNullable: true }),
        education: new FormControl(false, { nonNullable: true }),
        security: new FormControl(false, { nonNullable: true }),
      },
      { validators: [atLeastOneChecked] },
    ),
    consent: new FormControl(false, { nonNullable: true, validators: [Validators.requiredTrue] }),
  });

  protected readonly messages: Record<FieldName, string> = {
    name: 'Enter your first and last name.',
    email: 'Enter a valid email address, such as jan.smit@example.com.',
    contact: 'Choose how you would like us to contact you.',
    topics: 'Choose at least one topic.',
    consent: 'Agree to the privacy statement to continue.',
  };

  // Where each link in the error summary goes. For a group, that's its first option.
  protected readonly targets: Record<FieldName, string> = {
    name: 'name',
    email: 'email',
    contact: 'contact-email',
    topics: 'topics-research',
    consent: 'consent',
  };

  protected readonly contactOptions = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'post', label: 'Post' },
  ];

  protected readonly topicOptions = [
    { value: 'research', label: 'Research' },
    { value: 'education', label: 'Education' },
    { value: 'security', label: 'Security' },
  ] as const;

  protected readonly errors = signal<FieldName[]>([]);

  ngOnInit() {
    const initialErrors = this.initialErrors();
    if (initialErrors.length) {
      for (const field of initialErrors) {
        this.form.controls[field].setErrors({ server: true });
        this.form.controls[field].markAsTouched();
      }
      this.errors.set(initialErrors);
      this.focusErrorSummary();
    }
  }

  protected submit() {
    const fields = Object.keys(this.messages) as FieldName[];
    this.errors.set(fields.filter((field) => this.form.controls[field].invalid));

    if (this.form.invalid) {
      this.focusErrorSummary();
      return;
    }
    // Submit…
  }

  // hlmField links the text fields' description and error itself. The groups and the single
  // checkbox sit outside one hlmField, so their error shows and is linked here, from submit on.
  protected hasError(field: FieldName) {
    return this.errors().includes(field) && this.form.controls[field].invalid;
  }

  protected describedBy(field: 'contact' | 'topics') {
    return this.hasError(field) ? `${field}-description ${field}-error` : `${field}-description`;
  }

  // After rendering, otherwise the summary doesn't exist yet.
  private focusErrorSummary() {
    afterNextRender(() => this.errorSummary()?.nativeElement.focus(), {
      injector: this.injector,
    });
  }

  // With <base href="/">, a plain #-link navigates to the app root instead of to the field.
  // Move focus to the field ourselves.
  protected goToField(event: Event, field: FieldName) {
    event.preventDefault();
    document.getElementById(this.targets[field])?.focus();
  }
}
