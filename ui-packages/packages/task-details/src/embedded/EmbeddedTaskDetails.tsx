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
import { useCallback, useMemo } from 'react';
import {
  TaskDetailsApi,
  TaskDetailsChannelApi,
  TaskDetailsEnvelopeApi,
  UserTaskInstance
} from '../api';
import { EnvelopeServer } from '@kogito-tooling/envelope-bus/dist/channel';
import { EmbeddedEnvelopeFactory } from '@kogito-tooling/envelope/dist/embedded';

export type Props = {
  targetOrigin: string;
  envelopePath: string;
  userTask: UserTaskInstance;
};

export const EmbeddedTaskDetails = React.forwardRef<TaskDetailsApi, Props>(
  (props, forwardedRef) => {
    const pollInit = useCallback(
      (
        // eslint-disable-next-line
        envelopeServer: EnvelopeServer<
          TaskDetailsChannelApi,
          TaskDetailsEnvelopeApi
        >
      ) => {
        return envelopeServer.envelopeApi.requests.taskDetails__init(
          {
            origin: envelopeServer.origin,
            envelopeServerId: envelopeServer.id
          },
          {
            task: props.userTask
          }
        );
      },
      [props.userTask]
    );

    const refDelegate = useCallback(
      (
        envelopeServer: EnvelopeServer<
          TaskDetailsChannelApi,
          TaskDetailsEnvelopeApi
        >
      ): TaskDetailsApi => {
        return {};
      },
      []
    );

    const EmbeddedEnvelope = useMemo(() => {
      return EmbeddedEnvelopeFactory({
        api: props,
        envelopePath: props.envelopePath,
        origin: props.targetOrigin,
        refDelegate,
        pollInit
      });
    }, []);

    return <EmbeddedEnvelope ref={forwardedRef} />;
  }
);
