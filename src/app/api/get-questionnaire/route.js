import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongoose';
import Questionnaire from '../../../models/questionnaire.model';

export async function GET(request) {
    try {
        await dbConnect();
        const questionnaire = await Questionnaire.findOne({ identifier: 'learning-preference' });

        if (!questionnaire) {
            return NextResponse.json({ message: "Questionnaire not found" }, { status: 404 });
        }

        return NextResponse.json(questionnaire.questions, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: "Error fetching questionnaire" }, { status: 500 });
    }
}