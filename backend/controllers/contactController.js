import Contact from '../models/Contact.js';

// ============================================================
// SUBMIT CONTACT FORM
// ============================================================
export const submitContact = async (req, res) => {
    try {
        const { name, email, phone, subject, message, source } = req.body;

        const ipAddress = req.ip || req.connection.remoteAddress;

        const contact = await Contact.create({
            name,
            email,
            phone,
            subject,
            message,
            source: source || 'contact-form',
            ipAddress,
            status: 'pending',
            isRead: false
        });

        res.status(201).json({
            success: true,
            message: 'Your message has been sent successfully. We will get back to you soon.',
            data: {
                id: contact._id,
                name: contact.name,
                email: contact.email,
                subject: contact.subject,
                createdAt: contact.createdAt
            }
        });
    } catch (error) {
        console.error('Submit Contact Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// ============================================================
// GET ALL CONTACTS (Admin)
// ============================================================
export const getAllContacts = async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const query = {};

        if (status) query.status = status;

        const skip = (page - 1) * limit;
        const [contacts, total] = await Promise.all([
            Contact.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            Contact.countDocuments(query)
        ]);

        const counts = await Contact.aggregate([
            { $group: { _id: '$status', count: { $sum: 1 } } }
        ]);

        const statusCounts = { pending: 0, read: 0, replied: 0, archived: 0 };
        counts.forEach(item => {
            if (item._id in statusCounts) {
                statusCounts[item._id] = item.count;
            }
        });

        res.status(200).json({
            success: true,
            message: 'Contacts fetched successfully',
            data: {
                contacts,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total,
                    pages: Math.ceil(total / limit)
                },
                counts: statusCounts
            }
        });
    } catch (error) {
        console.error('Get All Contacts Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// ============================================================
// GET SINGLE CONTACT (Admin)
// ============================================================
export const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        if (!contact.isRead) {
            contact.isRead = true;
            contact.status = 'read';
            await contact.save();
        }

        res.status(200).json({
            success: true,
            message: 'Contact fetched successfully',
            data: contact
        });
    } catch (error) {
        console.error('Get Contact Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// ============================================================
// REPLY TO CONTACT (Admin)
// ============================================================
export const replyContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { adminResponse } = req.body;

        if (!adminResponse) {
            return res.status(400).json({
                success: false,
                message: 'Reply message is required'
            });
        }

        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        contact.adminResponse = adminResponse;
        contact.status = 'replied';
        contact.respondedAt = new Date();
        await contact.save();

        res.status(200).json({
            success: true,
            message: 'Reply sent successfully',
            data: contact
        });
    } catch (error) {
        console.error('Reply Contact Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};

// ============================================================
// DELETE CONTACT (Admin)
// ============================================================
export const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contact not found'
            });
        }

        await contact.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Contact deleted successfully'
        });
    } catch (error) {
        console.error('Delete Contact Error:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Server error'
        });
    }
};