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

export interface Resource {
  name: string;
  content: string;
}

export interface FormPackage {
  name: string;
  html: string;
  resources: Resource[];
}

export interface PackedForm {
  name: string;
  content: string;
}

export function FormPackingTool(formPackage: FormPackage): PackedForm {
  console.log(formPackage);

  return undefined;
}