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
import { useState } from 'react';
import JSONSchemaBridge from 'uniforms-bridge-json-schema';
import {
  DefaultFormValidator,
  FormValidator,
  ModelConversionTool
} from './utils';
import { AutoFields, AutoForm } from 'uniforms-unstyled';

export interface Props {
  formSchema: any;
  readOnly?: boolean;
}

const FormRenderer: React.FC<Props> = ({ formSchema, readOnly }) => {
  const [validator] = useState<FormValidator>(
    new DefaultFormValidator(formSchema)
  );

  const [bridge] = useState(
    new JSONSchemaBridge(formSchema, formModel => {
      // Converting back all the JS Dates into String before validating the model
      const newModel = ModelConversionTool.convertDateToString(
        formModel,
        formSchema
      );
      return validator.validate(newModel);
    })
  );

  return (
    <AutoForm
      placeholder={true}
      disabled={readOnly}
      schema={bridge}
      showInlineError={true}
      role={'form'}
    >
      <AutoFields autoField={} />
    </AutoForm>
  );
};

export default FormRenderer;
