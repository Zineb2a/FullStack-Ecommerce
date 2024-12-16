import mongoose from 'mongoose';

const NewsletterSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Newsletter', NewsletterSchema);
