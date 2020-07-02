jest.mock("src/mett/theming/theme-park");

jest.mock("src/mett/helpers/store-helper", () => ({
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	...jest.requireActual("src/mett/helpers/store-helper"),
	invalidArgument: () => false
}));

// No console.log() / setTimeout
// console.log = jest.fn(() => { throw new Error('Do not use console.log() in production') })
jest.setTimeout(1000);

// jest speedup when errors are part of the game
// Error.stackTraceLimit = 0

global.Promise = require("promise");

import * as All from "quasar";
import { VueConstructor } from "vue";
import Vue from "vue";

const { Quasar, Notify, Cookies, Dialog } = All;

function isComponent(value: any): value is VueConstructor {
	return value && value.component && value.component.name != null;
}

export const components = Object.keys(All).reduce<{ [index: string]: VueConstructor }>((object, key) => {
	const val = (All as any)[key];
	if (isComponent(val)) {
		object[key] = val;
	}
	return object;
}, {});

Vue.use(Quasar, { components, plugins: { Notify, Cookies, Dialog } });

Notify.create = () => {
	return jest.fn();
};

/*
import chai from 'chai'
// Make sure chai and jasmine ".not" play nice together
// https://medium.com/@RubenOostinga/combining-chai-and-jest-matchers-d12d1ffd0303
// updated here: https://www.andrewsouthpaw.com/jest-chai/
const originalNot = Object.getOwnPropertyDescriptor(chai.Assertion.prototype, 'not').get
Object.defineProperty(chai.Assertion.prototype, 'not', {
  get() {
    Object.assign(this, this.assignedNot)
    return originalNot.apply(this)
  },
  set(newNot) {
    this.assignedNot = newNot
    return newNot
  }
})

// Combine both jest and chai matchers on expect
const originalExpect = global.expect

global.expect = (actual) => {
  const originalMatchers = originalExpect(actual)
  const chaiMatchers = chai.expect(actual)

  // Add middleware to Chai matchers to increment Jest assertions made
  const { assertionsMade } = originalExpect.getState()
  Object.defineProperty(chaiMatchers, 'to', {
    get() {
      originalExpect.setState({ assertionsMade: assertionsMade + 1 })
      return chai.expect(actual)
    },
  })

  const combinedMatchers = Object.assign(chaiMatchers, originalMatchers)
  return combinedMatchers
}
Object.keys(originalExpect).forEach(key => (global.expect[key] = originalExpect[key]))
*/

// do this to make sure we don't get multiple hits from both webpacks when running SSR
setTimeout(() => {
	// do nothing
}, 1);
