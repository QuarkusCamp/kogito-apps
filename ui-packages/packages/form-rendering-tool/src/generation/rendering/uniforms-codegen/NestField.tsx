import React, { HTMLProps, useContext } from 'react';
import { connectField } from 'uniforms';

import { context } from 'uniforms';
import { renderField, renderNestedInputFragmentWithContext } from './Utils';

export type NestFieldProps = {
  error?: boolean;
  errorMessage?: string;
  fields?: any[];
  itemProps?: any;
  showInlineError?: boolean;
  disabled?: boolean;
  name: string;
} & HTMLProps<HTMLDivElement>;

const Nest: React.FunctionComponent<NestFieldProps> = ({
  id,
  children,
  error,
  errorMessage,
  fields,
  itemProps,
  label,
  name,
  showInlineError,
  disabled,
  ...props
}: NestFieldProps) => {
  const parentContext = useContext(context);

  const nestedHooks: string[] = [];
  const nestedElements: string[] = [];

  if (fields) {
    fields.forEach(field => {
      const rendered = renderNestedInputFragmentWithContext(
        parentContext,
        field,
        itemProps,
        disabled
      );

      nestedHooks.push(rendered.hooks);
      nestedElements.push(rendered.element);
    });
  }

  const bodyLabel = label ? `<label><b>${label}</b></label>` : '';

  const nestedFieldHooks = nestedHooks.join('\n');
  const nestedFieldElement = `<PatternFly.Card>
          <PatternFly.CardBody className="pf-c-form">
          ${bodyLabel}
          ${nestedElements.join('\n')}
          </PatternFly.CardBody></PatternFly.Card>`;

  return renderField(id, name, nestedFieldHooks, nestedFieldElement);
};

export default connectField(Nest);
