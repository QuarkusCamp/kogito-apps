import React from 'react';
import { TextInputProps } from '@patternfly/react-core';
import { connectField } from 'uniforms';

import wrapField from './wrapField';

export type NumFieldProps = {
  id: string;
  decimal?: boolean;
  disabled: boolean;
  value?: number;
  error?: boolean;
} & Omit<TextInputProps, 'isDisabled'>;

const Num = (props: NumFieldProps) => {
  /*

  const onChange = (value, event) => {
    const parse = props.decimal ? parseFloat : parseInt;
    const v = parse(event.target.value);
    // @ts-ignore
    props.onChange(isNaN(v) ? undefined : v);
  }
*/

  const max = props.max ? `max={${props.max}}` : '';
  const min = props.min ? `min={${props.min}}` : '';

  const input = `<PatternFly.TextInput
      type="number"
      name="${props.name}"
      isDisabled={${props.disabled || 'false'}}
      id="${props.id}"
      placeholder="${props.placeholder}"
      step={${props.decimal ? 0.01 : 1}}
      value="${props.value || ''}" ${max} ${min}
    />`;
  return <>{wrapField(props, input)}</>;
};

export default connectField(Num);
