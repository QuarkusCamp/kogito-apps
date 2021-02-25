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
import { useImperativeHandle, useState } from 'react';
import { MessageBusClientApi } from '@kogito-tooling/envelope-bus/dist/api';
import { TaskInboxChannelApi, TaskInboxState } from '../api';
import TaskInbox from './components/TaskInbox/TaskInbox';
import TaskInboxEnvelopeViewDriver from './TaskInboxEnvelopeViewDriver';
import '@patternfly/patternfly/patternfly.css';

export interface TaskInboxEnvelopeViewApi {
  initialize: (
    initialState?: TaskInboxState,
    allTaskStates?: string[],
    activeTaskStates?: string[]
  ) => void;
}

interface Props {
  channelApi: MessageBusClientApi<TaskInboxChannelApi>;
}

export const TaskInboxEnvelopeView = React.forwardRef<
  TaskInboxEnvelopeViewApi,
  Props
>((props, forwardedRef) => {
  const [
    isEnvelopeConnectedToChannel,
    setEnvelopeConnectedToChannel
  ] = useState<boolean>(false);
  const [initialState, setInitialState] = useState<TaskInboxState>();
  const [allTaskStates, setAllTaskStates] = useState<string[]>();
  const [activeTaskStates, setActiveTaskStates] = useState<string[]>();
  useImperativeHandle(
    forwardedRef,
    () => ({
      initialize: (initialState?, allTaskStates?, activeTaskStates?) => {
        setInitialState(initialState);
        setAllTaskStates(allTaskStates);
        setActiveTaskStates(activeTaskStates);
        setEnvelopeConnectedToChannel(true);
      }
    }),
    []
  );

  return (
    <React.Fragment>
      <TaskInbox
        isEnvelopeConnectedToChannel={isEnvelopeConnectedToChannel}
        driver={new TaskInboxEnvelopeViewDriver(props.channelApi)}
        initialState={initialState}
        allTaskStates={allTaskStates}
        activeTaskStates={activeTaskStates}
      />
    </React.Fragment>
  );
});

export default TaskInboxEnvelopeView;
