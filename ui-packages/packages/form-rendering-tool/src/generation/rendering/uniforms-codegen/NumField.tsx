import React from 'react';
import { TextInputProps } from '@patternfly/react-core';
import { connectField } from 'uniforms';

import wrapField from './wrapField';
import { getFieldHook, renderField } from './Utils';

export type NumFieldProps = {
  id: string;
  decimal?: boolean;
  disabled: boolean;
  value?: number;
  error?: boolean;
} & Omit<TextInputProps, 'isDisabled'>;

const Num: React.FunctionComponent<NumFieldProps> = (props: NumFieldProps) => {
  const hook = getFieldHook(props.name);

  const numInputHooks = `const [ ${hook.name}, ${hook.setter} ] = useState<string>();`;

  const max = props.max ? `max={${props.max}}` : '';
  const min = props.min ? `min={${props.min}}` : '';

  const numInputTemplate = wrapField(
    props,
    `<PatternFly.TextInput
      type="number"
      name="${props.name}"
      isDisabled={${props.disabled || 'false'}}
      id="${props.id}"
      placeholder="${props.placeholder}"
      step={${props.decimal ? 0.01 : 1}} ${max} ${min}
      value={${hook.name}}
      onChange={${hook.setter}}
    />`
  );

  return renderField(props.id, props.name, numInputHooks, numInputTemplate);
};

export default connectField(Num);
