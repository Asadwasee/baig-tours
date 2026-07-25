import test from 'node:test';
import assert from 'node:assert/strict';
import { validationResult } from 'express-validator';
import { bookingValidationRules } from '../middlewares/validation.js';

const runValidation = async (req) => {
  for (const rule of bookingValidationRules) {
    await rule(req, {}, () => {});
  }

  return validationResult(req);
};

test('booking validation rejects invalid email and negative amount', async () => {
  const req = {
    body: {
      customerDetails: {
        fullName: 'Aliyan',
        email: 'not-an-email',
        phone: '03001234567',
      },
      package: '507f1f77bcf86cd799439011',
      travelDate: '2025-01-01',
      adults: 1,
      totalAmount: -10,
    },
  };

  const result = await runValidation(req);

  assert.equal(result.isEmpty(), false);
  assert.ok(result.array().some((error) => error.msg.includes('valid email')));
  assert.ok(result.array().some((error) => error.msg.includes('positive number')));
});

test('booking validation accepts a valid booking payload', async () => {
  const req = {
    body: {
      customerDetails: {
        fullName: 'Aliyan',
        email: 'aliyan@example.com',
        phone: '03001234567',
      },
      package: '507f1f77bcf86cd799439011',
      travelDate: '2099-01-01',
      adults: 2,
      children: 1,
      totalAmount: 2500,
    },
  };

  const result = await runValidation(req);

  assert.equal(result.isEmpty(), true);
});
