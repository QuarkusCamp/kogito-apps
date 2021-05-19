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
import FormInputs from './FormInputs';
import NestedFormInputs from './NestedFormInputs';
import ReactDOMServer from 'react-dom/server';

const domParser = new DOMParser();

const parse = (content: string): string => {
  return domParser.parseFromString(content, 'text/html').body.textContent;
};

export const renderInputsFragment = (schema: Bridge): string => {
  const content = ReactDOMServer.renderToString(
    React.createElement(FormInputs, { schema })
  );
  return parse(content);
};

export const renderNestedInputFragmentWithContext = (
  parentContext: any,
  field: any,
  itempProps: any,
  disabled?: boolean
): string => {
  const content = ReactDOMServer.renderToString(
    React.createElement(NestedFormInputs, {
      parentContext,
      field,
      itempProps,
      disabled
    })
  );
  return parse(content);
};
