import test from 'node:test';
import assert from 'node:assert/strict';
import { buildWhatsAppLink, buildWhatsAppMessage } from '../utils/whatsapp.js';

test('builds a WhatsApp message for a booking update', () => {
  const message = buildWhatsAppMessage({
    customerName: 'Aliyan',
    packageName: 'Hunza Tour',
    bookingId: '123',
    status: 'confirmed',
    travelDate: '2026-08-01',
  });

  assert.match(message, /Aliyan/);
  assert.match(message, /Hunza Tour/);
  assert.match(message, /confirmed/);
});

test('builds a WhatsApp link with a normalized phone number', () => {
  const link = buildWhatsAppLink({ phone: '03001234567', message: 'Hello' });
  assert.match(link, /wa\.me\/923001234567/);
});
