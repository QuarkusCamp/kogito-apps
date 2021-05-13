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

import { FormContext } from '../../api';
import { EnvelopeFormApi } from '../../api/EnvelopeFormApi';

export class FormController {
  private data: any;
  private context: FormContext;

  public onOpen: (data: any, context: any) => void;
  public beforeSubmit: () => void;
  public afterSubmit: () => void;

  constructor() {
    console.log('FormController constructor');
  }

  public initForm(data: any, context: FormContext) {
    console.log('Controller: initForm');
    console.log(data);
    console.log(context);
    this.data = data;
    this.context = context;

    if (this.onOpen) {
      this.onOpen(data, context);
    }
  }

  public getContext(): FormContext {
    return this.context;
  }

  public getData(): any {
    return this.data;
  }
}

export class EnvelopeFormApiImpl implements EnvelopeFormApi {
  private _controller: FormController;

  constructor(controller: FormController) {
    this._controller = controller;
  }

  getContext(): FormContext {
    return this._controller.getContext();
  }

  getData(): any {
    return this._controller.getData();
  }

  reset(): void {
    console.log('reset');
  }

  submit(): void {
    console.log('submit');
  }

  public set onOpen(_onOpen: (data: any, context: any) => void) {
    this._controller.onOpen = _onOpen;
  }

  public set beforeSubmit(_beforeSubmit: () => void) {
    this._controller.beforeSubmit = _beforeSubmit;
  }

  public set afterSubmit(_afterSubmit: () => void) {
    this._controller.afterSubmit = _afterSubmit;
  }
}
