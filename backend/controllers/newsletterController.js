import Newsletter from '../models/Newsletter.js';
import { sendBulkNewsletterEmail } from '../utils/sendEmail.js';

// Subscribe to newsletter (Public)
export const subscribeNewsletter = async (req, res) => {
  try {
    const { email, source } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    let subscriber = await Newsletter.findOne({ email: normalizedEmail });

    if (subscriber) {
      if (subscriber.isSubscribed) {
        return res.status(400).json({
          success: false,
          message: 'This email is already subscribed to our newsletter.',
        });
      }

      subscriber.isSubscribed = true;
      subscriber.unsubscribedAt = null;
      if (source) subscriber.source = source;
      await subscriber.save();

      return res.status(200).json({
        success: true,
        message: 'Welcome back! Your subscription has been re-activated.',
        data: subscriber,
      });
    }

    subscriber = await Newsletter.create({
      email: normalizedEmail,
      source: source || 'website_footer',
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for subscribing to Baig Tours newsletter!',
      data: subscriber,
    });
  } catch (error) {
    console.error('Subscribe Newsletter Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during subscription',
    });
  }
};

// Unsubscribe from newsletter (Public)
export const unsubscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required to unsubscribe',
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const subscriber = await Newsletter.findOne({ email: normalizedEmail });

    if (!subscriber || !subscriber.isSubscribed) {
      return res.status(404).json({
        success: false,
        message: 'Email address not found in active subscribers list',
      });
    }

    subscriber.isSubscribed = false;
    subscriber.unsubscribedAt = new Date();
    await subscriber.save();

    res.status(200).json({
      success: true,
      message: 'You have been successfully unsubscribed from our newsletter.',
    });
  } catch (error) {
    console.error('Unsubscribe Newsletter Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// Get all subscribers (Admin)
export const getAllSubscribers = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, search } = req.query;
    const query = {};

    if (status === 'active') query.isSubscribed = true;
    if (status === 'unsubscribed') query.isSubscribed = false;

    if (search) {
      query.email = { $regex: search, $options: 'i' };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const [subscribers, total] = await Promise.all([
      Newsletter.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Newsletter.countDocuments(query),
    ]);

    const activeCount = await Newsletter.countDocuments({ isSubscribed: true });

    res.status(200).json({
      success: true,
      message: 'Subscribers fetched successfully',
      data: {
        subscribers,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
        activeSubscribers: activeCount,
      },
    });
  } catch (error) {
    console.error('Get All Subscribers Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// Send Bulk Newsletter Campaign (Admin)
export const sendNewsletterCampaign = async (req, res) => {
  try {
    const { subject, contentHtml } = req.body;

    if (!subject || !contentHtml) {
      return res.status(400).json({
        success: false,
        message: 'Subject and HTML content are required for newsletter campaign',
      });
    }

    const activeSubscribers = await Newsletter.find({ isSubscribed: true }).select('email');
    const recipientEmails = activeSubscribers.map(sub => sub.email);

    if (recipientEmails.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No active subscribers found to receive campaign email',
      });
    }

    await sendBulkNewsletterEmail({
      bccEmails: recipientEmails,
      subject,
      contentHtml
    });

    res.status(200).json({
      success: true,
      message: `Newsletter campaign dispatched successfully to ${recipientEmails.length} active subscribers.`,
      recipientCount: recipientEmails.length
    });
  } catch (error) {
    console.error('Newsletter Campaign Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error sending campaign',
    });
  }
};

// Delete subscriber (Admin)
export const deleteSubscriber = async (req, res) => {
  try {
    const subscriber = await Newsletter.findById(req.params.id);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: 'Subscriber record not found',
      });
    }

    await subscriber.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Subscriber deleted successfully',
    });
  } catch (error) {
    console.error('Delete Subscriber Error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};