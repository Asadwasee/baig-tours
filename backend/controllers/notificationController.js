import Booking from '../models/Booking.js';
import Customer from '../models/Customer.js';
import { buildWhatsAppLink, buildWhatsAppMessage } from '../utils/whatsapp.js';

export const getDashboardNotifications = async (req, res) => {
  try {
    const bookings = await Booking.find({ status: { $in: ['pending', 'confirmed'] } })
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('customer', 'fullName email phone')
      .populate('package', 'title destination price');

    const notifications = bookings.map((booking) => {
      const customer = booking.customer;
      const packageInfo = booking.package;
      const message = buildWhatsAppMessage({
        customerName: customer?.fullName || 'Customer',
        packageName: packageInfo?.title || 'tour package',
        bookingId: booking._id.toString(),
        status: booking.status,
        travelDate: booking.travelDate,
      });

      return {
        id: booking._id,
        bookingId: booking._id.toString(),
        customerName: customer?.fullName || 'Customer',
        phone: customer?.phone || '',
        packageName: packageInfo?.title || 'Tour Package',
        status: booking.status,
        message,
        whatsappLink: buildWhatsAppLink({ phone: customer?.phone, message }),
        createdAt: booking.createdAt,
      };
    });

    res.json({ success: true, data: notifications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
