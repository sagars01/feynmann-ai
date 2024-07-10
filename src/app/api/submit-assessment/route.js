import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongoose';
import Assessment from '../../../models/assessment.model';

export async function POST(request) {

    try {
        await dbConnect();
        const myJson = await request.json();

        const assessment = new Assessment(myJson);
        const savedAssessment = await assessment.save();

        return NextResponse.json({ message: "Assessment submitted successfully", id: savedAssessment._id }, { status: 200 });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ message: "Error submitting assessment" }, { status: 500 });
    }

}