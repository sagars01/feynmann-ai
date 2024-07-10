import mongoose from 'mongoose';

const AssessmentSchema = new mongoose.Schema({
    q1: { type: String, required: true },
    q2: { type: String, required: true },
    q3: { type: String, required: true },
    q4: { type: String, required: true },
    q5: { type: String, required: true },
    submittedAt: { type: Date, default: Date.now },
}, { collection: 'user-preferences' });

export default mongoose.models.Assessment || mongoose.model('Assessment', AssessmentSchema);