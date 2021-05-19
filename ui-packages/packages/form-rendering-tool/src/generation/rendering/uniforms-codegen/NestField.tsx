import React, { HTMLProps, useContext } from 'react';
import { connectField } from 'uniforms';

import { context } from 'uniforms';
import { renderNestedInputFragmentWithContext } from './Utils';

export type NestFieldProps = {
  error?: boolean;
  errorMessage?: string;
  fields?: any[];
  itemProps?: any;
  showInlineError?: boolean;
  disabled?: boolean;
  name: string;
} & HTMLProps<HTMLDivElement>;

const Nest = ({
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

  const getNestedFields = (): string => {
    if (fields) {
      return fields
        .map(field => {
          return renderNestedInputFragmentWithContext(
            parentContext,
            field,
            itemProps,
            disabled
          );
        })
        .join('');
    }
    return '';
  };

  const nestedFields = getNestedFields();

  const bodyLabel = label ? `<label><b>${label}</b></label>` : '';

  const body = `<PatternFly.Card>
          <PatternFly.CardBody className="pf-c-form">
          ${bodyLabel}
          ${nestedFields}
          </PatternFly.CardBody></PatternFly.Card>`;

  return <>{body}</>;
};

export default connectField(Nest);
