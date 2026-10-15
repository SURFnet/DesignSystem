'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Checkbox,
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  Input,
  RadioGroup,
  RadioGroupItem,
} from '@/index';

type FieldName = 'name' | 'email' | 'contact' | 'topics' | 'consent';

const messages: Record<FieldName, string> = {
  name: 'Enter your first and last name.',
  email: 'Enter a valid email address, such as jan.smit@example.com.',
  contact: 'Choose how you would like us to contact you.',
  topics: 'Choose at least one topic.',
  consent: 'Agree to the privacy statement to continue.',
};

// Where each link in the error summary goes. For a group, that's its first option.
const targets: Record<FieldName, string> = {
  name: 'name',
  email: 'email',
  contact: 'contact-email',
  topics: 'topics-research',
  consent: 'consent',
};

const contactOptions = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
  { value: 'post', label: 'Post' },
];

const topicOptions = [
  { value: 'research', label: 'Research' },
  { value: 'education', label: 'Education' },
  { value: 'security', label: 'Security' },
];

function validate(data: FormData): FieldName[] {
  const errors: FieldName[] = [];
  if (!String(data.get('name') ?? '').trim()) errors.push('name');
  if (!/^\S+@\S+\.\S+$/.test(String(data.get('email') ?? '').trim())) errors.push('email');
  if (!data.get('contact')) errors.push('contact');
  if (data.getAll('topics').length === 0) errors.push('topics');
  if (!data.get('consent')) errors.push('consent');
  return errors;
}

export type ExampleFormProps = {
  /** Fields that are already invalid when the page loads, e.g. after server-side validation. */
  initialErrors?: FieldName[];
};

export function ExampleForm({ initialErrors = [] }: ExampleFormProps) {
  const [errors, setErrors] = useState<FieldName[]>(initialErrors);
  const [attempt, setAttempt] = useState(0);
  const errorSummary = useRef<HTMLDivElement>(null);

  // After every failed submit, and on load when there are errors already: move focus to the
  // summary. An effect runs after rendering, so the element exists by then.
  useEffect(() => {
    errorSummary.current?.focus();
  }, [attempt]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newErrors = validate(new FormData(event.currentTarget));
    setErrors(newErrors);
    if (newErrors.length > 0) {
      setAttempt((a) => a + 1);
      return;
    }
    // Submit…
  }

  const hasError = (field: FieldName) => errors.includes(field);

  // Link the description (if the field has one) always, and the error message only when there is one.
  const describedBy = (field: FieldName, hasDescription = true) =>
    [hasDescription && `${field}-description`, hasError(field) && `${field}-error`]
      .filter(Boolean)
      .join(' ') || undefined;

  // The props every invalid control needs, so its error is styled, announced and linked.
  const invalidProps = (field: FieldName, hasDescription = true) => ({
    'aria-describedby': describedBy(field, hasDescription),
    'aria-invalid': hasError(field) || undefined,
    'aria-errormessage': hasError(field) ? `${field}-error` : undefined,
  });

  return (
    <form noValidate onSubmit={submit}>
      <FieldGroup>
        <h2 className="text-xl font-semibold">Form title</h2>

        {errors.length > 0 && (
          <Alert ref={errorSummary} id="error-summary" variant="danger" tabIndex={-1}>
            <AlertTitle>There are errors in the form.</AlertTitle>
            <AlertDescription>
              <ul>
                {errors.map((field) => (
                  <li key={field}>
                    <a href={`#${targets[field]}`}>{messages[field]}</a>
                  </li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <FieldSet>
          <FieldLegend>
            <h3>About you</h3>
          </FieldLegend>

          <FieldGroup>
            <Field data-invalid={hasError('name')}>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <FieldDescription id="name-description">Enter your full name.</FieldDescription>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Jan Smit"
                required
                spellCheck={false}
                autoComplete="name"
                {...invalidProps('name')}
              />
              {hasError('name') && <FieldError id="name-error">{messages.name}</FieldError>}
            </Field>

            <Field data-invalid={hasError('email')}>
              <FieldLabel htmlFor="email">Email address</FieldLabel>
              <FieldDescription id="email-description">Enter your email address.</FieldDescription>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="jan.smit@example.com"
                required
                spellCheck={false}
                autoComplete="email"
                {...invalidProps('email')}
              />
              {hasError('email') && <FieldError id="email-error">{messages.email}</FieldError>}
            </Field>
          </FieldGroup>
        </FieldSet>

        <FieldSet>
          <FieldLegend>
            <h3>Your preferences</h3>
          </FieldLegend>

          <FieldGroup>
            {/* Radio group: one choice. The fieldset's legend is the question. */}
            <FieldSet>
              <FieldLegend variant="label">How would you like us to contact you?</FieldLegend>
              <FieldDescription id="contact-description">
                We only contact you about your registration.
              </FieldDescription>
              <RadioGroup name="contact" required>
                {contactOptions.map((option) => (
                  <Field key={option.value} orientation="horizontal">
                    <RadioGroupItem
                      id={`contact-${option.value}`}
                      value={option.value}
                      {...invalidProps('contact')}
                    />
                    <FieldLabel htmlFor={`contact-${option.value}`}>{option.label}</FieldLabel>
                  </Field>
                ))}
              </RadioGroup>
              {hasError('contact') && (
                <FieldError id="contact-error">{messages.contact}</FieldError>
              )}
            </FieldSet>

            {/* Checkbox group: one or more choices. */}
            <FieldSet>
              <FieldLegend variant="label">Which topics are you interested in?</FieldLegend>
              <FieldDescription id="topics-description">Choose one or more.</FieldDescription>
              <FieldGroup>
                {topicOptions.map((option) => (
                  <Field key={option.value} orientation="horizontal">
                    <Checkbox
                      id={`topics-${option.value}`}
                      name="topics"
                      value={option.value}
                      {...invalidProps('topics')}
                    />
                    <FieldLabel htmlFor={`topics-${option.value}`}>{option.label}</FieldLabel>
                  </Field>
                ))}
              </FieldGroup>
              {hasError('topics') && <FieldError id="topics-error">{messages.topics}</FieldError>}
            </FieldSet>
          </FieldGroup>
        </FieldSet>

        {/* A single checkbox: its label is the statement you agree to. */}
        <Field data-invalid={hasError('consent')}>
          <Field orientation="horizontal">
            <Checkbox
              id="consent"
              name="consent"
              value="yes"
              required
              {...invalidProps('consent', false)}
            />
            <FieldLabel htmlFor="consent">I agree to the privacy statement.</FieldLabel>
          </Field>
          {hasError('consent') && <FieldError id="consent-error">{messages.consent}</FieldError>}
        </Field>

        <Field orientation="horizontal">
          <Button type="submit">Submit</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
