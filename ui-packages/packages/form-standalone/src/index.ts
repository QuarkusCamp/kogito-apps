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

import { StandaloneFormApi } from './api/StandaloneFormApi';
import { EnvelopeServer } from '../../../../../kogito-tooling/packages/envelope-bus/dist/channel';
import { KogitoFormChannelApi } from './api/KogitoFormChannelApi';
import { KogitoFormChannelApiImpl } from './embedded/KogitoFormChannelApiImpl';
import { KogitoFormEnvelopeApi } from './api/KogitoFormEnvelopeApi';

const createEnvelopeServer = (
  iframe: HTMLIFrameElement,
  formSchema,
  formData,
  formContext,
  origin?: string
) => {
  const defaultOrigin =
    window.location.protocol === 'file:' ? '*' : window.location.origin;

  return new EnvelopeServer<KogitoFormChannelApi, KogitoFormEnvelopeApi>(
    { postMessage: message => iframe.contentWindow.postMessage(message, '*') },
    origin || defaultOrigin,
    self => {
      return self.envelopeApi.requests.form_init(
        {
          origin: self.origin,
          envelopeServerId: self.id
        },
        {
          data: formData,
          context: {
            schema: formSchema,
            ...{ formContext }
          }
        }
      );
    }
  );
};

export function openForm(args: {
  container: Element;
  formContent: string;
  formSchema: any;
  formData?: any;
  doSubmit: (data: any) => Promise<void>;
  origin?: string;
  context?: any;
}): StandaloneFormApi {
  const iframe = document.createElement('iframe');
  iframe.srcdoc = args.formContent;
  iframe.style.width = '100%';
  iframe.style.height = '100%';
  iframe.style.border = 'none';

  const envelopeServer = createEnvelopeServer(
    iframe,
    args.formSchema,
    args.formData,
    args.context,
    args.origin
  );

  const listener = (message: MessageEvent) => {
    envelopeServer.receive(
      message.data,
      new KogitoFormChannelApiImpl(args.doSubmit)
    );
  };
  window.addEventListener('message', listener);

  args.container.appendChild(iframe);
  envelopeServer.startInitPolling();

  return {
    getData(): Promise<any> {
      envelopeServer.envelopeApi.requests.form_getFormData();
      return Promise.resolve(undefined);
    },
    reset(): Promise<void> {
      return envelopeServer.envelopeApi.requests.form_reset();
    },
    submit(): Promise<void> {
      return new Promise<void>((resolve, reject) => {
        envelopeServer.envelopeApi.requests
          .form_submit()
          .then(data => {
            args.doSubmit(data);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  };
}
