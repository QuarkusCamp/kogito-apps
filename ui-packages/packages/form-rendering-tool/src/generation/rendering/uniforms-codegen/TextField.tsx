// @ts-ignore
import React from 'react';
import { TextInputProps } from '@patternfly/react-core';

import wrapField from './wrapField';
import { connectField } from 'uniforms';
import { getFieldHook, renderField } from './Utils';

export type TextFieldProps = {
  id: string;
  label: string;
  decimal?: boolean;
  value?: string;
  disabled: boolean;
  error?: boolean;
  errorMessage?: string;
  field?: { format: string };
} & Omit<TextInputProps, 'isDisabled'>;

const Text: React.FunctionComponent<TextFieldProps> = (
  props: TextFieldProps
) => {
  const isDate: boolean =
    props.type === 'date' || props.field.format === 'date';

  /* const validateDate = useCallback(
     (date) => {
       if (props.min && date < props.min) {
         return props.errorMessage || `Should be bigger than ${props.min}`;
       } else if (props.max && date > props.max) {
         return props.errorMessage || `Should be smaller than ${props.max}`;
       }
       return '';
     },
     [props.max, props.min]
   );
 
   const onDateChange = useCallback(
     (value: string) => {
       props.onChange(value);
     },
     [props.disabled, props.onChange]
   );
 */

  /*const renderDateControl = (): string => {
    /!*
           validators="${validateDate}"
        onChange="${onDateChange}"
 
     *!/
    return `<PatternFly.DatePicker
        name="${props.name}"
        id="${props.id}"
        isDisabled={${props.disabled || 'false'}}
        value="${props.value || ''}/>`;
  };*/

  if (isDate) {
    return undefined;
  }

  const hook = getFieldHook(props.name);

  const textInputTemplate = wrapField(
    props,
    `<PatternFly.TextInput
        name="${props.name}"
        id="${props.id}"
        isDisabled={${props.disabled || 'false'}}
        validated="${props.error ? 'error' : 'default'}"
        placeholder="${props.placeholder}"
        type="${props.type || 'text'}"
        value={${hook.name}}
        onChange={${hook.setter}}
        />`
  );

  const textHook = `const [ ${hook.name}, ${hook.setter} ] = useState<string>();`;

  return renderField(props.id, props.name, textHook, textInputTemplate);
};

export default connectField(Text, { kind: 'leaf' });
