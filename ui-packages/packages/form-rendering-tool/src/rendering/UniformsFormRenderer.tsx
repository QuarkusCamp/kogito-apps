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

import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import set from 'lodash/set';
import unset from 'lodash/unset';

import { HTMLForm, FormRenderer, JSONForm } from './Api';

export abstract class UniformsFormRenderer implements FormRenderer {
  abstract name: string;
  protected abstract doRender: (jsonForm: JSONForm) => HTMLForm;

  render(jsonForm: JSONForm): HTMLForm {
    const schemaClone = cloneDeep(jsonForm.schema);

    if (schemaClone.properties) {
      for (const key of Object.keys(schemaClone.properties)) {
        const property = schemaClone.properties[key];

        const isInput: boolean = get(property, 'input', false);
        const isOutput: boolean = get(property, 'output', false);

        unset(property, 'input');
        unset(property, 'output');

        // If is input but not output mark it as readonly
        if (isInput && !isOutput) {
          set(property, 'uniforms.disabled', true);
        }
      }
    }
    return this.doRender(schemaClone);
  }
}
