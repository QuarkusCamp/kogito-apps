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
import { Bridge } from 'uniforms';
import decode from 'unescape';
import FormInputs from './FormInputs';
import NestedFormInputs from './NestedFormInputs';
import ReactDOMServer from 'react-dom/server';
import { RenderedField } from './RenderedField';

export const NS_SEPARATOR = '__';
export const FIELD_SET_PREFFIX = `set`;

export const getFieldHook = (
  fieldName: string
): { name: string; setter: string } => {
  const name = fieldName.split('.').join(NS_SEPARATOR);
  const setter = `${FIELD_SET_PREFFIX}${NS_SEPARATOR}${name}`;
  return {
    name,
    setter
  };
};
export const renderField = (
  id: string,
  name: string,
  hooks: string,
  element: string
) => {
  const input: RenderedField = {
    id,
    name,
    hooks,
    element
  };

  return <>{JSON.stringify(input)}</>;
};

const parse = (content: string): string => {
  return decode(content);
};

export const renderInputsFragment = (schema: Bridge): RenderedField[] => {
  const content = ReactDOMServer.renderToString(
    React.createElement(FormInputs, { schema })
  );
  return JSON.parse(parse(content));
};

export const renderNestedInputFragmentWithContext = (
  parentContext: any,
  field: any,
  itempProps: any,
  disabled?: boolean
): RenderedField => {
  const content = ReactDOMServer.renderToString(
    React.createElement(NestedFormInputs, {
      parentContext,
      field,
      itempProps,
      disabled
    })
  );
  return JSON.parse(parse(content));
};
