"use client"
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

export default function LearningPreferenceForm({ questions, answersInit }) {
    const { toast } = useToast();
    const [isFormValid, setIsFormValid] = useState(false);
    const [answers, setAnswers] = useState(answersInit);


    useEffect(() => {
        if (questions.length > 0) {
            const allQuestionsAnswered = questions.every(q => answers[q.id] !== undefined);
            setIsFormValid(allQuestionsAnswered);
        }
    }, []);


    const handleChange = (question, value) => {
        setAnswers(prev => ({ ...prev, [question]: value }));
    };

    const resetForm = () => {
        const resetAnswers = questions.reduce((acc, q) => ({ ...acc, [q.id]: '' }), {});
        setAnswers(resetAnswers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/assessment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(answers),
            });

            if (!response.ok) {
                throw new Error('Failed to submit assessment');
            }

            const data = await response.json();
            console.log('Form submitted:', data);

            toast({
                title: "Success!",
                description: "Your assessment has been submitted successfully.",
                duration: 5000,
            });

            resetForm();

        } catch (error) {
            console.error('Error submitting form:', error);

            toast({
                title: "Error",
                description: "There was a problem submitting your assessment. Please try again.",
                variant: "destructive",
                duration: 5000,
            });
        }
    };

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
                        <Button type="submit" disabled={!isFormValid}>Submit</Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    );
}