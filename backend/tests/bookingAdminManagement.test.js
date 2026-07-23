import test from 'node:test';
import assert from 'node:assert/strict';
import * as bookingController from '../controllers/bookingController.js';

test('booking controller exposes admin booking management handlers', () => {
  assert.equal(typeof bookingController.updateBookingStatus, 'function');
  assert.equal(typeof bookingController.updatePaymentStatus, 'function');
  assert.equal(typeof bookingController.exportBookings, 'function');
  assert.equal(typeof bookingController.getBookingVoucher, 'function');
});
