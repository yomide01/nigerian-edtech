"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface Material {
  id: string;
  title: string;
  course_code: string;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export default function MockTestPage() {
  const router = useRouter();
  const [step, setStep] = useState<"config" | "test" | "results">("config");
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  
  // Config state
  const [materials, setMaterials] = useState<Material[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [questionCount, setQuestionCount] = useState(10);
  
  // Test state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [score, setScore] = useState(0);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      // Load user's materials
      const { data, error } = await supabase
        .from("materials")
        .select("id, title, course_code")
        .eq("user_id", user.id);

      if (error) {
        console.error("Error loading materials:", error);
      } else {
        setMaterials(data || []);
      }
      setLoading(false);
    };
    init();
  }, [router]);

  // Timer effect
  useEffect(() => {
    if (step !== "test") return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          finishTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [step]);

  const generateTest = async () => {
    if (!selectedMaterial) return;
    setGenerating(true);

    try {
      // Get material details
      const material = materials.find(m => m.id === selectedMaterial);
      
      // Call OpenRouter to generate questions
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "openrouter/tencent/hy3-preview:free",
          messages: [
            {
              role: "system",
              content: "You are an exam question generator. Generate multiple choice questions in JSON format. Return ONLY a JSON array with objects having: id, question, options (array of 4 strings), correctAnswer (0-3 index).",
            },
            {
              role: "user",
              content: `Generate ${questionCount} ${difficulty} difficulty multiple choice questions for ${material?.course_code || "this course"}. Each question should have 4 options with one correct answer. Return as JSON array.`,
            },
          ],
          response_format: { type: "json_object" },
        }),
      });

      if (!response.ok) throw new Error("Failed to generate questions");

      const data = await response.json();
      const generatedQuestions = JSON.parse(data.choices[0].message.content).questions || [];

      setQuestions(generatedQuestions.map((q: any, i: number) => ({
        id: q.id || `q_${i}`,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
      })));
      setCurrentQuestion(0);
      setAnswers([]);
      setTimeLeft(60 * 10); // Reset timer
      setStep("test");
    } catch (error) {
      console.error("Error generating test:", error);
      alert("Failed to generate test. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  const selectAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const finishTest = () => {
    const correctCount = answers.reduce((count, answer, index) => {
      return answer === questions[index].correctAnswer ? count + 1 : count;
    }, 0);
    setScore(correctCount);
    setStep("results");
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishTest();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (step === "config") {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <span className="font-bold text-xl text-gray-900">EduNaija</span>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Configure Mock Test</h1>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Material</label>
                <select
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2"
                >
                  <option value="">Choose a material</option>
                  {materials.map((material) => (
                    <option key={material.id} value={material.id}>
                      {material.course_code} - {material.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <div className="flex gap-2">
                  {["Easy", "Medium", "Hard"].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setDifficulty(diff as any)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium ${
                        difficulty === diff
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
                  value={questionCount}
                  onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2"
                  min="5"
                  max="50"
                />
              </div>

              <Button
                onClick={generateTest}
                className="w-full bg-green-600 hover:bg-green-700 text-white mt-6"
                disabled={!selectedMaterial || generating}
              >
                {generating ? "Generating..." : `Start Test (${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")})`}
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (step === "test") {
    const question = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
              ← Back to Dashboard
            </Link>
            <div className="text-2xl font-bold text-gray-900">
              {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
            </div>
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1}/{questions.length}
            </span>
          </div>
        </header>

        <div className="w-full bg-gray-200 h-1">
          <div className="bg-green-600 h-1" style={{ width: `${progress}%` }} />
        </div>

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
                {currentQuestion === questions.length - 1 ? "Submit Test" : "Next"}
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Results step
  const percentage = (score / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl font-bold text-green-600">{percentage}%</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Test Complete!</h1>
        <p className="text-gray-600 mb-6">
          You scored {score} out of {questions.length} questions correctly.
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
