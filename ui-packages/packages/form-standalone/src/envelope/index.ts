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

import { Envelope, EnvelopeApiFactoryArgs } from '@kogito-tooling/envelope';
import {
  EnvelopeBus,
  EnvelopeBusMessage
} from '@kogito-tooling/envelope-bus/dist/api';
import {
  KogitoFormEnvelopeApi,
  KogitoFormChannelApi,
  Association,
  FormInitArgs,
  FormContext
} from '../api';
import { StandaloneFormEnvelopeViewApi } from './StandaloneFormEnvelopeViewApi';
import { ContainerType } from '../../../../../../kogito-tooling/packages/envelope/src/api';
import { EnvelopeFormApi } from '../api/EnvelopeFormApi';
import { FormController, EnvelopeFormApiImpl } from './form/FormController';

export function initForm(container: HTMLFormElement): EnvelopeFormApi {
  const bus: EnvelopeBus = {
    postMessage<D, Type>(
      message: EnvelopeBusMessage<D, Type>,
      targetOrigin?: string,
      _?: any
    ) {
      window.parent.postMessage(message, '*', _);
    }
  };

  const envelope = new Envelope<
    KogitoFormEnvelopeApi,
    KogitoFormChannelApi,
    StandaloneFormEnvelopeViewApi,
    any
  >(bus, {
    containerType: ContainerType.IFRAME
  });

  const formController: FormController = new FormController();

  const delegate = (): Promise<() => StandaloneFormEnvelopeViewApi> => {
    return new Promise<() => StandaloneFormEnvelopeViewApi>(resolve => {
      const viewApi: StandaloneFormEnvelopeViewApi = {
        standaloneForm_init(data: any, context: FormContext) {
          formController.initForm(data, context);

          const inputs = container.elements;

          inputs['candidate.name'].value = data.candidate.name;
          inputs['candidate.email'].value = data.candidate.email;
          inputs['candidate.salary'].value = data.candidate.salary;
          inputs['candidate.skills'].value = data.candidate.skills;
        }
      };

      resolve(() => viewApi);
    });
  };

  envelope.start(
    delegate,
    {},
    {
      create(
        args: EnvelopeApiFactoryArgs<
          KogitoFormEnvelopeApi,
          KogitoFormChannelApi,
          StandaloneFormEnvelopeViewApi,
          any
        >
      ): KogitoFormEnvelopeApi {
        return {
          form_init(
            association: Association,
            initArgs: FormInitArgs
          ): Promise<void> {
            args.envelopeBusController.associate(
              association.origin,
              association.envelopeServerId
            );
            args.view().standaloneForm_init(initArgs.data, initArgs.context);
            return Promise.resolve();
          },
          form_getFormData(): Promise<any> {
            return Promise.resolve();
          },
          form_reset(): Promise<void> {
            return Promise.resolve();
          },
          form_submit(): Promise<any> {
            return Promise.resolve();
          }
        };
      }
    }
  );

  return new EnvelopeFormApiImpl(formController);
}
