import LearningPreferenceForm from './learningPreference.form';
import dbConnect from '../../lib/mongoose';
import Questionnaire from '../../models/questionnaire.model';

async function getQuestions() {
    console.log("getQuestions called");
    try {
        await dbConnect();
        const questionnaire = await Questionnaire.findOne({ identifier: 'learning-preference' });

        if (!questionnaire) {
            console.error("Questionnaire not found");
            return { questions: [], answers: {} };
        }

        const questions = questionnaire.questions;
        const answers = questions.reduce((acc, q) => ({ ...acc, [q.id]: '' }), {});
        return { questions, answers };
    } catch (error) {
        console.error('Error fetching questions:', error);
        return { questions: [], answers: {} };
    }
}

export default async function LearningPreferencePage() {
    console.log("LearningPreferencePage rendered");
    const { questions, answers } = await getQuestions();

    if (questions.length === 0) {
        return <div>Error loading questions. Please try again later.</div>;
    }

    return (
        <LearningPreferenceForm questions={questions} answersInit={answers} />
    );
}