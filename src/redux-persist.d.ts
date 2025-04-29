// src/custom.d.ts
declare module 'redux-persist/integration/react' {
    import { PersistGate as PG } from 'redux-persist/es/integration/react';
    export const PersistGate: typeof PG;
  }
  