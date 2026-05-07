import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Brain, Users, TrendingUp, Shield, Zap } from "lucide-react";

const nigerianUniversities = [
  "University of Lagos (UNILAG)",
  "Obafemi Awolowo University (OAU)",
  "University of Ibadan (UI)",
  "Lagos State University (LASU)",
  "University of Nigeria, Nsukka (UNN)",
  "Ahmadu Bello University (ABU)",
  "University of Benin (UNIBEN)",
  "Covenant University",
  "Federal University of Technology, Akure (FUTA)",
  "University of Ilorin (UNILORIN)",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              Built for Nigerian Students
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Study Smarter with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600"> AI-Powered</span>
              <br />Academic Tools
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of Nigerian university students using AI to master their courses, 
              predict exam patterns, and access school-specific study materials.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg">
                <Link href="/signup">
                  Get Started Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-gray-300">
                <Link href="#features">See How It Works</Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
              <span className="font-medium text-gray-700">Trusted by students from:</span>
              {nigerianUniversities.slice(0, 5).map((uni, i) => (
                <span key={i} className="bg-gray-100 px-3 py-1 rounded-full">{uni.split(" (")[0]}</span>
              ))}
              <span className="text-gray-400">+ more</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful AI tools designed specifically for Nigerian university students
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group p-8 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">School-Specific Repository</h3>
              <p className="text-gray-600 leading-relaxed">
                Access materials organized by your school, department, and courses. Upload and access lecture notes, past questions, and study guides.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Tutor Engine</h3>
              <p className="text-gray-600 leading-relaxed">
                Chat with AI that understands your course materials. Get explanations, summaries, and personalized quiz questions instantly.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Exam Pattern Intelligence</h3>
              <p className="text-gray-600 leading-relaxed">
                Predict exam topics based on your lecturer's historical patterns. Focus on what matters most for your tests.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community Collaboration</h3>
              <p className="text-gray-600 leading-relaxed">
                Share resources, rate materials, and collaborate with fellow students. Build reputation as a trusted contributor.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-red-200 transition-colors">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure & Private</h3>
              <p className="text-gray-600 leading-relaxed">
                Your data stays protected with JWT authentication, encrypted passwords, and school-isolated repositories.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 rounded-2xl border border-gray-100 hover:border-yellow-200 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-200 transition-colors">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Study Tools</h3>
              <p className="text-gray-600 leading-relaxed">
                Generate flashcards, mock tests, and personalized study plans. Track your progress with gamification features.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Study Experience?
          </h2>
          <p className="text-xl text-green-100 mb-10">
            Join EduNaija today and get access to AI-powered academic tools designed for Nigerian students.
          </p>
          <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
            <Link href="/signup">
              Create Free Account
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
