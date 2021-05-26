import React, { createContext, useContext } from 'react';

import { Bridge, context, randomIds } from 'uniforms';
import AutoFields from './AutoFields';

export enum CodeGenPhase {
  INPUTS,
  HOOKS
}

export interface CodeGenContext {
  phase: CodeGenPhase;
}

export const codeGenContext = createContext<CodeGenContext>(null);

export const useCodeGenPhase = (): CodeGenPhase => {
  const ctx = useContext<CodeGenContext>(codeGenContext);
  if (ctx) {
    return ctx.phase;
  }
  return undefined;
};

export interface ProviderProps {
  phase: CodeGenPhase;
  schema: Bridge;
}

export const CodeGenContextProvider: React.FC<ProviderProps> = props => {
  const ctx = {
    changed: false,
    changedMap: undefined,
    error: false,
    model: undefined,
    name: [],
    onChange: undefined,
    onSubmit: undefined,
    randomId: randomIds(),
    schema: props.schema,
    state: {
      disabled: false,
      label: true,
      placeholder: true,
      showInlineError: true
    },
    submitting: false,
    validating: false
  };

  return (
    <codeGenContext.Provider
      value={{
        phase: props.phase
      }}
    >
      <context.Provider value={ctx}>
        <AutoFields />
      </context.Provider>
    </codeGenContext.Provider>
  );
};
