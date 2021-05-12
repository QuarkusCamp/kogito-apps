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

import css from '!!raw-loader!@patternfly/patternfly/patternfly.css';
import { UniformsFormRenderer } from '../UniformsFormRenderer';
import { HTMLForm } from '../Api';
import { component2String } from '../utils/ReactRenderingUtils';
import FormRenderer from './component/FormRenderer';

export default class PatternflyFormRenderer extends UniformsFormRenderer {
  name: 'patternfly';

  protected doRender = (schema: any): HTMLForm => {
    return {
      html: component2String(FormRenderer, { formSchema: schema }),
      css: css
    };
  };
}
