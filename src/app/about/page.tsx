import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, Brain, Globe, Heart, Zap } from "lucide-react";

export default function AboutPage() {
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
              <Link href="/features" className="text-sm text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</Link>
              <Link href="/community" className="text-sm text-gray-600 hover:text-gray-900">Community</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Mission */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Our Mission
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            To empower every Nigerian university student with AI-driven academic tools, 
            making quality education accessible, personalized, and effective.
          </p>
        </div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why EduNaija?</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Nigerian universities face unique challenges: overcrowded lecture halls, 
                limited access to quality materials, and lecturers with distinct question patterns 
                that students struggle to decode.
              </p>
              <p>
                EduNaija was born from the realization that students need more than just 
                another PDF repository. They need intelligent tools that understand the Nigerian 
                academic context, predict exam patterns, and make studying efficient.
              </p>
              <p>
                Built by students, for students — we're creating the academic operating 
                system that Nigerian universities deserve.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-900">10M+</p>
              <p className="text-gray-600">Nigerian students to serve</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">
                We use cutting-edge AI to solve real academic problems for Nigerian students.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accessibility</h3>
              <p className="text-gray-600">
                Making quality education tools available to every Nigerian student, regardless of their university.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">
                Building a collaborative ecosystem where students help students succeed.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-br from-green-600 to-blue-600 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Academic Journey?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join EduNaija today and experience the future of studying in Nigerian universities.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
              Create Free Account
              <Zap className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-gray-900">EduNaija</span>
            </div>
            <p className="text-sm text-gray-600">
              © 2026 EduNaija. Built for Nigerian students, by Nigerian students.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
