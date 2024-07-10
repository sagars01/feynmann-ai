import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

export default function LearningPreferenceForm() {
    const [answers, setAnswers] = useState({
        q1: '',
        q2: '',
        q3: '',
        q4: '',
        q5: ''
    });

    const handleChange = (question, value) => {
        setAnswers(prev => ({ ...prev, [question]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would typically send the data to your MongoDB database
        console.log('Form submitted:', answers);
        // Add your MongoDB submission logic here
    };

    const questions = [
        {
            id: 'q1',
            text: "Imagine you're learning about a new topic.Which of the following activities would you find most engaging?",
            options: [
                { value: 'a', label: 'Watching a video explanation' },
                { value: 'b', label: 'Reading a detailed article' },
                { value: 'c', label: 'Discussing the topic with others' },
                { value: 'd', label: 'Experimenting with hands-on examples' },
            ],
        },
        {
            id: 'q2',
            text: "When facing a challenge while learning something new, what's your first instinct?",
            options: [
                { value: 'a', label: 'Look for step-by-step instructions' },
                { value: 'b', label: 'Ask someone for help' },
                { value: 'c', label: 'Try to figure it out through trial and error' },
                { value: 'd', label: 'Search for different explanations of the concept' },
            ],
        },
        {
            id: 'q3',
            text: 'How do you prefer to track your progress when learning a new skill?',
            options: [
                { value: 'a', label: 'Completing quizzes or tests' },
                { value: 'b', label: 'Building a project that uses the new skill' },
                { value: 'c', label: 'Explaining the concept to someone else' },
                { value: 'd', label: 'Setting and achieving personal milestones' },
            ],
        },
        {
            id: 'q4',
            text: 'If you could design your ideal learning environment, which feature would be most important to you?',
            options: [
                { value: 'a', label: 'Interactive elements that respond to your input' },
                { value: 'b', label: 'A community of learners to collaborate with' },
                { value: 'c', label: 'A variety of resources in different formats (text, video, audio)' },
                { value: 'd', label: 'Practical, real-world examples and case studies' },
            ],
        },
        {
            id: 'q5',
            text: 'When you successfully grasp a new concept, what gives you the greatest sense of achievement?',
            options: [
                { value: 'a', label: 'Seeing how it connects to other things you know' },
                { value: 'b', label: 'Being able to apply it to solve a problem' },
                { value: 'c', label: 'Sharing your knowledge with others' },
                { value: 'd', label: 'Mastering increasingly complex aspects of the topic' },
            ],
        },
    ];

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Learning Preference Assessment</CardTitle>
                <CardDescription>Please answer the following questions to help us understand your learning preferences.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    {questions.map((question) => (
                        <div key={question.id} className="mb-6">
                            <h3 className="mb-2 font-semibold">{question.text}</h3>
                            <RadioGroup
                                onValueChange={(value) => handleChange(question.id, value)}
                                value={answers[question.id]}
                            >
                                {question.options.map((option) => (
                                    <div key={option.value} className="flex items-center space-x-2">
                                        <RadioGroupItem value={option.value} id={`${question.id}-${option.value}`} />
                                        <Label htmlFor={`${question.id}-${option.value}`}>{option.label}</Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                    ))}
                    <CardFooter className="flex justify-end">
                        <Button type="submit">Submit</Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
}