/*
 * Copyright 2021 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { connectField } from 'uniforms';
import { SelectFieldProps } from 'uniforms-unstyled';

import jp from 'jsonpath';
import { set } from 'lodash';

type HTMLSelectFieldProps = SelectFieldProps;

export function processSchema(formSchema: any) {
  const entries = jp.query(formSchema, '$..properties[?(@.enum)]');

  entries.forEach(entry => {
    set(entry, 'uniforms.component', HTMLSelectField);
  });
}

function HTMLSelectField(props: HTMLSelectFieldProps) {
  const options = props.allowedValues.map((allowedValue, index) => {
    return (
      <option key={`${props.name}.${index}`} value={allowedValue}>
        {allowedValue}
      </option>
    );
  });
  return (
    <select
      id={props.id}
      className={'pf-c-form-control'}
      name={props.name}
      value={props.value}
      defaultValue={props.defaultValue}
    >
      {options}
    </select>
  );
}

export default connectField(HTMLSelectField, {});
