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

import PatternflyFormRenderer from '../PatternflyFormRenderer';
import '../styles.css';

const formSchema = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  type: 'object',
  properties: {
    candidate: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          format: 'email'
        },
        name: {
          type: 'string',
          enum: ['Pere', 'Pol', 'Roc', 'Moni']
        },
        salary: {
          type: 'integer'
        },
        skills: {
          type: 'string'
        },
        date: {
          type: 'string',
          format: 'date'
        },
        time: {
          type: 'string',
          format: 'time'
        },
        datetime: {
          type: 'string',
          format: 'date-time'
        }
      }
    },
    approve: {
      type: 'boolean'
    }
  }
};

const renderer: PatternflyFormRenderer = new PatternflyFormRenderer();

describe('PatternflyFormRenderer tests', () => {
  it('Rendering', () => {
    const result = renderer.render({
      name: 'testForm',
      schema: formSchema
    });

    console.log(result);
  });
});
