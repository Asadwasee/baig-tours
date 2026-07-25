const normalizePhone = (phone) => {
  if (!phone) return '';
  const digits = String(phone).replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('92')) return `+${digits}`;
  if (digits.startsWith('0')) return `+92${digits.slice(1)}`;
  return `+${digits}`;
};

export const buildWhatsAppMessage = ({ customerName, packageName, bookingId, status, travelDate }) => {
  const formattedDate = travelDate ? new Date(travelDate).toLocaleDateString('en-PK') : 'TBD';
  const label = status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Update';

  return `Hello ${customerName || 'Customer'},\nYour booking ${bookingId || ''} for ${packageName || 'your selected package'} is ${label.toLowerCase()}.\nTravel Date: ${formattedDate}.\nThank you for choosing Baig Tours.`;
};

export const buildWhatsAppLink = ({ phone, message }) => {
  const normalizedPhone = normalizePhone(phone);
  const encodedMessage = encodeURIComponent(message || '');
  if (!normalizedPhone) return '';
  return `https://wa.me/${normalizedPhone.replace('+', '')}?text=${encodedMessage}`;
};
