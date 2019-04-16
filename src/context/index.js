import React from 'react';

const ctx = React.createContext();

export const FormContext = ctx;
export const FormProvider = ctx.Provider;
export const FormConsumer = ctx.Consumer;
