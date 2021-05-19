import React, { createContext } from 'react';

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

export interface ProviderProps {
  phase: CodeGenPhase;
  schema: Bridge;
}

export const CodeGenContextProvider: React.FC<ProviderProps> = props => {
  return (
    <context.Provider
      value={{
        changed: false,
        changedMap: undefined,
        error: false,
        model: undefined,
        name: [],
        onChange: undefined,
        onSubmit: undefined,
        randomId: randomIds(),
        schema: props.schema,
        state: undefined,
        submitting: false,
        validating: false
      }}
    >
      <codeGenContext.Provider
        value={{
          phase: props.phase
        }}
      >
        <AutoFields />
      </codeGenContext.Provider>
    </context.Provider>
  );
};
