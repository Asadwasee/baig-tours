import test from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import Customer from '../models/Customer.js';
import Booking from '../models/Booking.js';

test('customer model exposes cnic field for customer profile data', () => {
  assert.ok(Customer.schema.path('cnic'), 'Customer schema should define a cnic field');
});

test('booking model links to customer and package refs', () => {
  assert.equal(Booking.schema.path('customer').options.ref, 'Customer');
  assert.equal(Booking.schema.path('package').options.ref, 'Package');
});

test('booking travel date must be today or later', () => {
  const booking = new Booking({
    customer: new mongoose.Types.ObjectId(),
    package: new mongoose.Types.ObjectId(),
    travelDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    adults: 1,
    totalAmount: 1000,
  });

  const error = booking.validateSync();
  assert.ok(error, 'Validation should fail for a past travel date');
  assert.match(error.errors.travelDate.message, /today or later/i);
});
