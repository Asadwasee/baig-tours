const VALID_BOOKING_STATUSES = ['pending', 'confirmed', 'cancelled', 'completed'];

export const isValidBookingStatus = (status) => VALID_BOOKING_STATUSES.includes(status);

export const getBookingStatusLabel = (status) => {
  const labels = {
    pending: 'Pending',
    confirmed: 'Confirmed',
    cancelled: 'Cancelled',
    completed: 'Completed',
  };

  return labels[status] || 'Pending';
};

export const getStatusTransitionMessage = (status) => {
  const messages = {
    pending: 'Your booking is pending confirmation.',
    confirmed: 'Your booking has been confirmed.',
    cancelled: 'Your booking has been cancelled.',
    completed: 'Your booking has been completed successfully.',
  };

  return messages[status] || 'Your booking status has been updated.';
};
