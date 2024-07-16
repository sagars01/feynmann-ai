require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = 'MASTER'; // Replace with your database name if different

const questionnaire = {
    identifier: "learning-preference",
    questions: [
        {
            id: "q1",
            text: "Imagine you're learning about a new topic. Which of the following activities would you find most engaging?",
            options: [
                { value: "a", label: "Watching a video explanation" },
                { value: "b", label: "Reading a detailed article" },
                { value: "c", label: "Discussing the topic with others" },
                { value: "d", label: "Experimenting with hands-on examples" }
            ]
        },
        {
            id: "q2",
            text: "When facing a challenge while learning something new, what's your first instinct?",
            options: [
                { value: "a", label: "Look for step-by-step instructions" },
                { value: "b", label: "Ask someone for help" },
                { value: "c", label: "Try to figure it out through trial and error" },
                { value: "d", label: "Search for different explanations of the concept" }
            ]
        },
        {
            id: "q3",
            text: "How do you prefer to track your progress when learning a new skill?",
            options: [
                { value: "a", label: "Completing quizzes or tests" },
                { value: "b", label: "Building a project that uses the new skill" },
                { value: "c", label: "Explaining the concept to someone else" },
                { value: "d", label: "Setting and achieving personal milestones" }
            ]
        },
        {
            id: "q4",
            text: "If you could design your ideal learning environment, which feature would be most important to you?",
            options: [
                { value: "a", label: "Interactive elements that respond to your input" },
                { value: "b", label: "A community of learners to collaborate with" },
                { value: "c", label: "A variety of resources in different formats (text, video, audio)" },
                { value: "d", label: "Practical, real-world examples and case studies" }
            ]
        },
        {
            id: "q5",
            text: "When you successfully grasp a new concept, what gives you the greatest sense of achievement?",
            options: [
                { value: "a", label: "Seeing how it connects to other things you know" },
                { value: "b", label: "Being able to apply it to solve a problem" },
                { value: "c", label: "Sharing your knowledge with others" },
                { value: "d", label: "Mastering increasingly complex aspects of the topic" }
            ]
        }
    ]
};

async function insertQuestionnaire() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        console.log('Connected successfully to server');

        const db = client.db(dbName);
        const collection = db.collection('preferences-questionaire');

        // Check if the questionnaire already exists
        const existingQuestionnaire = await collection.findOne({ identifier: "learning-preference" });

        if (existingQuestionnaire) {
            console.log('Questionnaire already exists. Updating...');
            const result = await collection.updateOne(
                { identifier: "learning-preference" },
                { $set: questionnaire }
            );
            console.log(`${result.modifiedCount} document(s) updated`);
        } else {
            console.log('Inserting new questionnaire...');
            const result = await collection.insertOne(questionnaire);
            console.log(`${result.insertedCount} document(s) inserted`);
        }

    } catch (err) {
        console.error('An error occurred:', err);
    } finally {
        await client.close();
        console.log('Database connection closed');
    }
}

insertQuestionnaire().catch(console.error);