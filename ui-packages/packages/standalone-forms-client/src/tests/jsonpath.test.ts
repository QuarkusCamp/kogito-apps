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

import _ from 'lodash';
import jp from 'jsonpath';

const model = {
  name: 'Jon',
  lastName: 'Snow',
  address: {
    city: 'Winterfell'
  }
};

describe('tests', () => {
  it('read write', () => {
    console.log(jp.value(model, 'name'));
    jp.value(model, 'name', 'Pere');
    console.log(jp.value(model, 'name'));
    console.log(jp.value(model, 'lastName'));
    console.log(jp.value(model, 'address.city'));
  });

  it('read write non existing', () => {
    class TestHandler implements ProxyHandler<any> {
      set(
        target: any,
        property: PropertyKey,
        value: any,
        receiver: any
      ): boolean {
        target[property] = value;
        return true;
      }

      get(target: any, property: PropertyKey, receiver: any): any {
        return target[property];
      }
    }

    const modelProxy = new Proxy(model, new TestHandler());
    modelProxy['address'] = new Proxy(model.address, new TestHandler());

    jp.value(modelProxy, 'name', 'Pere');
    jp.value(model, 'address.city', 'Sitges');

    console.log(jp.value(modelProxy, 'name'));
    console.log(jp.value(model, 'address.city'));
  });
});
