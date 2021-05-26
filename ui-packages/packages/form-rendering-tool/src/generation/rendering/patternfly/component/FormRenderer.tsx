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

import * as React from 'react';
import JSONSchemaBridge from 'uniforms-bridge-json-schema';
import AutoFields from '../../uniforms-codegen/AutoFields';
import PatternflyCodeGenAutoForm from '../../uniforms-codegen/PatternflyCodegenAutoForm';

export interface Props {
  id: string;
  formSchema: any;
}

const FormRenderer: React.FC<Props> = ({ id, formSchema }) => {
  return (
    <PatternflyCodeGenAutoForm
      id={id}
      schema={new JSONSchemaBridge(formSchema, formModel => true)}
    >
      <AutoFields />
    </PatternflyCodeGenAutoForm>
  );
};

export default FormRenderer;
