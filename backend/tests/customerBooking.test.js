import test from 'node:test';
import assert from 'node:assert/strict';
import Customer from '../models/Customer.js';
import Booking from '../models/Booking.js';

test('customer model exposes cnic field for customer profile data', () => {
  assert.ok(Customer.schema.path('cnic'), 'Customer schema should define a cnic field');
});

test('booking model links to customer and package refs', () => {
  assert.equal(Booking.schema.path('customer').options.ref, 'Customer');
  assert.equal(Booking.schema.path('package').options.ref, 'Package');
});
