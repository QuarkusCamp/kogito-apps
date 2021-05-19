import React from 'react';
import { CheckboxProps } from '@patternfly/react-core';
import { connectField } from 'uniforms';

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
  const checkbox = `<div>
    <PatternFly.Checkbox
      isChecked={${!!value}}
      isDisabled={${disabled || 'false'}}
      id="${id}"
      name="${name}"
      label="${label}"
    />
  </div>`;
  return <>{checkbox}</>;
};

export default connectField(Bool);
