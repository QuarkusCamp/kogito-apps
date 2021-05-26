import React from 'react';
import { CheckboxProps } from '@patternfly/react-core';
import { connectField } from 'uniforms';
import { getFieldHook, renderField } from './Utils';
export type BoolFieldProps = {
  appearance?: 'checkbox' | 'switch';
  label?: string;
  legend?: string;
  disabled: boolean;
} & Omit<CheckboxProps, 'isDisabled'>;

const Bool: React.FunctionComponent<BoolFieldProps> = ({
  disabled,
  id,
  label,
  name,
  value,
  ...props
}) => {
  const hook = getFieldHook(name);

  const checkHooks = `const [ ${hook.name}, ${hook.setter} ] = useState<boolean>();`;
  const checkTemplate = `<div>
    <PatternFly.Checkbox
      isChecked={${hook.name}}
      isDisabled={${disabled || 'false'}}
      id="${id}"
      name="${name}"
      label="${label}"
      onChange={${hook.setter}}
    />
  </div>`;

  return renderField(id, name, checkHooks, checkTemplate);
};

export default connectField(Bool);
