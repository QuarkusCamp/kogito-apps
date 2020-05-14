import React from 'react';
// @ts-ignore
import {
  AutoFields,
  AutoForm,
  DateField,
  ErrorsField
} from 'uniforms-patternfly';

import Ajv from 'ajv';
import JSONSchemaBridge from 'uniforms-bridge-json-schema';
import { ActionGroup } from '@patternfly/react-core/dist/js/components/Form/ActionGroup';
import { Button } from '@patternfly/react-core';

export interface IFormAction {
  id: string;
  label: string;
  clearAfterSubmit?: boolean;
  onSubmit: (model: any) => void;
}

interface IOwnProps {
  title: string;
  schema: any;
  model?: any;
  actions?: IFormAction[];
}

const FormRenderer: React.FC<IOwnProps> = ({
  title,
  schema,
  model,
  actions
}) => {
  const enabled = actions && actions.length > 0;

  let formAction;

  const ajv = new Ajv({ allErrors: true, useDefaults: true });

  const createValidator = () => {
    const validator = ajv.compile(schema);
    return formModel => {
      validator(formModel);
      if (validator.errors && validator.errors.length) {
        throw { details: validator.errors };
      }
    };
  };

  const schemaValidator = createValidator();

  const formSchema = new JSONSchemaBridge(schema, schemaValidator);
  return (
    <div>
      <h1>{title}</h1>
      <AutoForm
        schema={formSchema}
        model={model}
        disabled={!enabled}
        showInlineError
        placeholder
        onSubmit={formModel =>
          formAction ? formAction.onSubmit(formModel) : null
        }
      >
        <AutoFields />
        <ErrorsField />
        <ActionGroup>
          {actions
            ? actions.map(action => {
                return (
                  <Button
                    key={'submit-' + action.id}
                    type="submit"
                    variant="primary"
                    onClick={() => (formAction = action)}
                  >
                    {action.label}
                  </Button>
                );
              })
            : null}
        </ActionGroup>
      </AutoForm>
    </div>
  );
};

export default FormRenderer;
