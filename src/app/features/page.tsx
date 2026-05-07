import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, TrendingUp, Users, Shield, Zap, FileText, Clock, Award } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "School-Specific Knowledge Repository",
    description: "Access materials organized by your school, faculty, department, and courses. Upload and access lecture notes, past questions, and study guides - all isolated by university.",
    color: "green",
  },
  {
    icon: Brain,
    title: "AI Tutor Engine",
    description: "Chat with AI that understands your course materials. Get explanations, summaries, and personalized quiz questions. Uses RAG technology like NotebookLM but enhanced for Nigerian universities.",
    color: "blue",
  },
  {
    icon: TrendingUp,
    title: "Lecturer & Exam Pattern Intelligence",
    description: "Predict exam topics based on your lecturer's historical patterns. The AI analyzes question styles, repeated concepts, and topic frequency to help you focus on what matters most.",
    color: "purple",
  },
  {
    icon: Users,
    title: "Community & Collaboration Layer",
    description: "Share resources, rate materials, and collaborate with fellow students. Build reputation as a trusted contributor with upvotes, verified badges, and quality ratings.",
    color: "orange",
  },
  {
    icon: FileText,
    title: "AI PDF Summarization",
    description: "Quickly understand uploaded materials before opening them fully. Get concise summaries, key points, and topic breakdowns instantly.",
    color: "red",
  },
  {
    icon: Clock,
    title: "AI Study Planner",
    description: "Creates personalized study schedules, exam countdown plans, revision systems, and performance tracking. Stay on top of your academic goals.",
    color: "yellow",
  },
  {
    icon: Zap,
    title: "AI Mock Test Generator",
    description: "Select your school, course, difficulty level, and exam type. Generate realistic CBT tests, timed exams, and personalized quizzes with grading and weak-topic analysis.",
    color: "pink",
  },
  {
    icon: Award,
    title: "Gamification & Retention",
    description: "Study streaks, achievement systems, leaderboards, smart reminders, AI motivation, and exam countdown systems to keep you engaged throughout the semester.",
    color: "indigo",
  },
];

const testimonials = [
  { name: "Chinedu O.", school: "UNILAG", text: "EduNaija helped me predict 85% of my CSC 201 exam questions. Game changer!" },
  { name: "Amara T.", school: "OAU", text: "The AI tutor explains complex concepts better than my lecturers sometimes. Love it!" },
  { name: "Ibrahim M.", school: "ABU", text: "Finally a platform that understands Nigerian universities. The past questions are gold." },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-xl text-gray-900">EduNaija</span>
            </Link>
            <nav className="flex items-center gap-4">
              <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/login">
                <Button variant="ghost" size="sm">Log in</Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">Sign up free</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Powerful Features for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> Smarter Studying</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Everything you need to excel in Nigerian universities, powered by AI and community intelligence.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg">
              Get Started Free
              <Zap className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Nigerian Students
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our features are designed specifically for the unique challenges of Nigerian university education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorClasses = {
                green: "bg-green-100 text-green-600",
                blue: "bg-blue-100 text-blue-600",
                purple: "bg-purple-100 text-purple-600",
                orange: "bg-orange-100 text-orange-600",
                red: "bg-red-100 text-red-600",
                yellow: "bg-yellow-100 text-yellow-600",
                pink: "bg-pink-100 text-pink-600",
                indigo: "bg-indigo-100 text-indigo-600",
              }[feature.color];

              return (
                <div key={index} className="p-8 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${colorClasses}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            What Students Are Saying
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.school}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Study Experience?
          </h2>
          <p className="text-xl text-green-100 mb-10">
            Join thousands of Nigerian students using AI to study smarter, not harder.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
              Create Free Account
              <Zap className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
