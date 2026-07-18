import test from 'node:test';
import assert from 'node:assert/strict';
import { isValidBookingStatus, getBookingStatusLabel } from '../utils/bookingStatus.js';

test('valid booking statuses are accepted', () => {
  assert.equal(isValidBookingStatus('pending'), true);
  assert.equal(isValidBookingStatus('confirmed'), true);
  assert.equal(isValidBookingStatus('cancelled'), true);
  assert.equal(isValidBookingStatus('completed'), true);
});

test('invalid booking statuses are rejected', () => {
  assert.equal(isValidBookingStatus('in-progress'), false);
  assert.equal(isValidBookingStatus(''), false);
});

test('status labels are human readable', () => {
  assert.equal(getBookingStatusLabel('confirmed'), 'Confirmed');
  assert.equal(getBookingStatusLabel('cancelled'), 'Cancelled');
});
