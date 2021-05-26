import React, { ComponentType, useContext } from 'react';
import { context } from 'uniforms';

import AutoField from './AutoField';
import { RenderedField } from './RenderedField';
import { renderNestedInputFragmentWithContext } from './Utils';

export type AutoFieldsProps = {
  autoField?: ComponentType<{ name: string }>;
  element?: ComponentType | string;
  fields?: string[];
  omitFields?: string[];
};

export default function AutoFields({
  autoField,
  element,
  fields,
  omitFields,
  ...props
}: AutoFieldsProps) {
  const parentContext = useContext(context);
  const schema = parentContext.schema;

  const renderedFields: RenderedField[] = [];

  (fields || schema.getSubfields())
    .filter(field => !omitFields!.includes(field))
    .forEach(field => {
      const renderedField = renderNestedInputFragmentWithContext(
        parentContext,
        field,
        undefined
      );
      renderedFields.push(renderedField);
    });

  return <>{JSON.stringify(renderedFields)}</>;
}

AutoFields.defaultProps = {
  autoField: AutoField,
  element: 'div',
  omitFields: []
};
