import test from 'node:test';
import assert from 'node:assert/strict';
import * as customerController from '../controllers/customerController.js';

test('customer controller exposes admin booking history handler', () => {
  assert.equal(typeof customerController.getCustomerBookingHistory, 'function');
});
