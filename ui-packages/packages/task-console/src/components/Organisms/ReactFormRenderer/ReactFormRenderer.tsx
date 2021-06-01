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

import React, { useState } from 'react';

import uuidv4 from 'uuid';
import {
  ActionGroup,
  Button,
  Form,
  FormGroup,
  TextArea
} from '@patternfly/react-core';

const ReactFormRenderer: React.FC<any> = props => {
  const [formName, setFormName] = useState<string>();
  const [source, setSource] = useState<string>();

  const renderform = () => {
    if (source) {
      const container: HTMLElement = document.getElementById('formContainer');
      container.innerHTML = '';
      const id = uuidv4();
      const formContainer: HTMLElement = document.getElementById('form');
      formContainer.id = id;

      container.appendChild(formContainer);

      //ReactDOM.render(<Form__hiring_ITInterview />, target);

      try {
        const scriptElement: HTMLScriptElement = document.createElement(
          'script'
        );
        scriptElement.type = 'text/babel';
        scriptElement.dataset.type = 'module';
        scriptElement.dataset.presets = 'react,stage-0';

        scriptElement.textContent = `
        
        const { useState } = React;
        const { Form, Checkbox, Card, CardBody, FormGroup, TextInput } = PatternFlyReact;
        
        ${source}
        
        const target = document.getElementById('${id}');
        
        const element = React.createElement(${formName}, {});
        ReactDOM.render(element, target);
        `;
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: 8
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          marginBottom: '1rem',
          flex: 2
        }}
      >
        <Form>
          <FormGroup fieldId={'formName'} label={'Form Name'}>
            <TextArea onChange={setFormName}>{formName}</TextArea>
          </FormGroup>
          <FormGroup fieldId={'source'} label={'Source Code'}>
            <TextArea onChange={setSource}>{source}</TextArea>
          </FormGroup>
          <ActionGroup>
            <Button variant="primary" onClick={renderform}>
              Render Form
            </Button>
          </ActionGroup>
        </Form>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          marginBottom: '1rem',
          flex: 2
        }}
        id={'formContainer'}
      >
        {}
      </div>
    </div>
  );
};

export default ReactFormRenderer;
