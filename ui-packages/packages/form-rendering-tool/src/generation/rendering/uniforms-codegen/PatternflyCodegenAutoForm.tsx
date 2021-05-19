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

import { renderInputsFragment } from './Utils';

export type Props = {
  disabled?: boolean;
  id?: string;
  placeholder?: boolean;
  schema: Bridge;
  showInlineError?: boolean;
};

const PatternflyCodeGenAutoForm: React.FC<Props> = props => {
  const inputs = renderInputsFragment(props.schema);

  console.log(inputs);
  return <div>{inputs}</div>;
};

export default PatternflyCodeGenAutoForm;
