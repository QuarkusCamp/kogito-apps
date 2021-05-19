import { FormGroupProps } from '@patternfly/react-core';

type WrapperProps = {
  id: string;
  error?: boolean;
  errorMessage?: string;
  help?: string;
  showInlineError?: boolean;
} & Omit<FormGroupProps, 'onChange' | 'fieldId'>;

export default function wrapField(
  {
    id,
    label,
    type,
    disabled,
    error,
    errorMessage,
    showInlineError,
    help,
    required,
    ...props
  }: WrapperProps,
  children: string
) {
  return `<FormGroup
      fieldId="${id}"
      label="${label}"
      isRequired="${required}"
      validated="${error ? 'error' : 'default'}"
      type="${type}"
      helperText="${help}"
      helperTextInvalid="${errorMessage}"
    >
      ${children}
    </FormGroup>`;
}