import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
    id: String,
    text: String,
    options: [{
        value: String,
        label: String
    }]
});

const QuestionnaireSchema = new mongoose.Schema({
    identifier: { type: String, required: true, unique: true },
    questions: [QuestionSchema]
}, { collection: 'preferences-questionaire' });

const Questionnaire = mongoose.models.Questionnaire || mongoose.model('Questionnaire', QuestionnaireSchema);

export default Questionnaire;