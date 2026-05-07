"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Mock test configuration
const courses = [
  { code: "CSC 201", title: "Data Structures & Algorithms" },
  { code: "MTH 301", title: "Advanced Calculus" },
  { code: "PHY 201", title: "Electromagnetism" },
];

const difficulties = ["Easy", "Medium", "Hard"];

// Mock questions
const mockQuestions = [
  {
    id: 1,
    question: "What is the time complexity of inserting a node in a binary search tree?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correct: 1,
  },
  {
    id: 2,
    question: "Which traversal gives nodes in sorted order in a BST?",
    options: ["Pre-order", "In-order", "Post-order", "Level-order"],
    correct: 1,
  },
  {
    id: 3,
    question: "What is the maximum number of nodes in a binary tree of height h?",
    options: ["h", "2h", "2^h - 1", "h²"],
    correct: 2,
  },
];

export default function MockTestPage() {
  const [step, setStep] = useState<"config" | "test" | "results">("config");
  const [config, setConfig] = useState({ course: "", difficulty: "Medium", count: 10 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes

  const startTest = () => {
    setStep("test");
    setCurrentQuestion(0);
    setAnswers([]);
  };

  const selectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < mockQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep("results");
    }
  };

  if (step === "config") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Configure Mock Test</h1>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
              <select
                value={config.course}
                onChange={(e) => setConfig({ ...config, course: e.target.value })}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.code} value={course.code}>{course.code} - {course.title}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <div className="flex gap-2">
                {difficulties.map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setConfig({ ...config, difficulty: diff })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      config.difficulty === diff
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Number of Questions</label>
              <input
                type="number"
                value={config.count}
                onChange={(e) => setConfig({ ...config, count: parseInt(e.target.value) })}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2"
                min="5"
                max="50"
              />
            </div>

            <Button
              onClick={startTest}
              className="w-full bg-green-600 hover:bg-green-700 text-white mt-6"
              disabled={!config.course}
            >
              Start Test (10:00)
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "test") {
    const question = mockQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / mockQuestions.length) * 100;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with timer */}
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
              ← Back to Dashboard
            </Link>
            <div className="text-2xl font-bold text-gray-900">
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
            </div>
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1}/{mockQuestions.length}
            </span>
          </div>
        </header>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 h-1">
          <div className="bg-green-600 h-1" style={{ width: `${progress}%` }} />
        </div>

        {/* Question */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {question.question}
            </h2>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
                    answers[currentQuestion] === index
                      ? "border-green-500 bg-green-50 text-green-700"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </button>
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={nextQuestion}
              >
                {currentQuestion === mockQuestions.length - 1 ? "Submit Test" : "Next"}
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Results step
  const score = answers.filter((answer, index) => answer === mockQuestions[index].correct).length;
  const percentage = (score / mockQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-green-600">{percentage}%</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Test Complete!</h1>
        <p className="text-gray-600 mb-6">
          You scored {score} out of {mockQuestions.length} questions correctly.
        </p>
        <div className="space-y-3">
          <Link href="/mock-test">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              Take Another Test
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" className="w-full">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
