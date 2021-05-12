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

import {
  Envelope,
  EnvelopeApiFactoryArgs,
  EnvelopeIFrameConfig
} from '@kogito-tooling/envelope';
import { EnvelopeBus } from '@kogito-tooling/envelope-bus/dist/api';
import {
  KogitoFormEnvelopeApi,
  KogitoFormChannelApi,
  Association,
  FormInitArgs
} from '../api';
import { KogitoFormEnvelopeViewApi } from './KogitoFormEnvelopeViewApi';
import { ContainerType } from '../../../../../../kogito-tooling/packages/envelope/src/api';

export function init(args: {
  config: EnvelopeIFrameConfig;
  container: HTMLElement;
  bus: EnvelopeBus;
}) {
  const envelope = new Envelope<
    KogitoFormEnvelopeApi,
    KogitoFormChannelApi,
    KogitoFormEnvelopeViewApi,
    any
  >(args.bus, {
    containerType: ContainerType.IFRAME
  });

  const delegate = (): Promise<() => KogitoFormEnvelopeViewApi> => {
    return new Promise<() => KogitoFormEnvelopeViewApi>(resolve => {
      const api: KogitoFormEnvelopeViewApi = {
        form_init() {
          console.log('hi');
        }
      };

      resolve(() => api);
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
          KogitoFormEnvelopeViewApi,
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
            args.view().form_init();
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
}
