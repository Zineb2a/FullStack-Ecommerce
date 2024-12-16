import Newsletter from '../models/newsletterModel.js';

export const subscribe = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    try {
        const existingEmail = await Newsletter.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ success: false, message: 'Email already subscribed.' });
        }

        const newSubscription = new Newsletter({ email });
        await newSubscription.save();

        return res.status(201).json({ success: true, message: 'Subscription successful!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Server error.' });
    }
};
