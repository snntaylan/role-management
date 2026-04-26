// TypeScript wrapper around the JS fakeApi implementation
// This file provides a default-typed export so TS can import it cleanly.
/* eslint-disable @typescript-eslint/no-var-requires */
import fake from './fakeApi';

const fakeApi: any = fake && fake.default ? fake.default : fake;

export default fakeApi;
