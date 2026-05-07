"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

// Mock data for demonstration
const mockCourses = [
  { id: 1, code: "CSC 201", title: "Data Structures & Algorithms", materials: 24, aiChats: 5 },
  { id: 2, code: "MTH 301", title: "Advanced Calculus", materials: 18, aiChats: 3 },
  { id: 3, code: "PHY 201", title: "Electromagnetism", materials: 31, aiChats: 7 },
];

const mockMaterials = [
  { id: 1, title: "Lecture Notes Week 1-5", course: "CSC 201", type: "lecture_note", uploaded: "2 days ago", downloads: 45 },
  { id: 2, title: "Past Questions 2023-2024", course: "MTH 301", type: "past_question", uploaded: "1 week ago", downloads: 120 },
  { id: 3, title: "Lab Manual Semester 1", course: "PHY 201", type: "lab_manual", uploaded: "3 days ago", downloads: 67 },
];

const mockInsights = [
  { course: "CSC 201", topic: "Binary Trees", probability: 85, trend: "high" },
  { course: "MTH 301", topic: "Fourier Series", probability: 72, trend: "medium" },
  { course: "PHY 201", topic: "Maxwell's Equations", probability: 90, trend: "high" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
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
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Welcome, John!</span>
              <Link href="/login">
                <Button variant="outline" size="sm">Log out</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-gray-900">73</div>
            <div className="text-sm text-gray-600">Materials Accessed</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-green-600">15</div>
            <div className="text-sm text-gray-600">AI Tutor Sessions</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-blue-600">3</div>
            <div className="text-sm text-gray-600">Mock Tests Taken</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-purple-600">5</div>
            <div className="text-sm text-gray-600">Day Study Streak</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Courses & Materials */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Courses */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {mockCourses.map((course) => (
                  <div key={course.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{course.code}</h3>
                        <p className="text-sm text-gray-600">{course.title}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">{course.materials} materials</span>
                        <Link href={`/courses/${course.id}`}>
                          <Button size="sm" variant="outline">View</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Materials */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Recent Materials</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {mockMaterials.map((material) => (
                  <div key={material.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{material.title}</h3>
                        <p className="text-sm text-gray-600">{material.course} • {material.uploaded}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">↓ {material.downloads}</span>
                        <Button size="sm" variant="outline">Download</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - AI Insights */}
          <div className="space-y-6">
            {/* AI Exam Predictions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Exam Predictions</h2>
                <p className="text-sm text-gray-600 mt-1">AI-powered insights</p>
              </div>
              <div className="p-6 space-y-4">
                {mockInsights.map((insight, i) => (
                  <div key={i} className="p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{insight.course}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        insight.trend === 'high' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {insight.trend} probability
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{insight.topic}</p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${insight.probability}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/ai-tutor">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    Chat with AI Tutor
                  </Button>
                </Link>
                <Link href="/mock-test">
                  <Button className="w-full" variant="outline">
                    Take Mock Test
                  </Button>
                </Link>
                <Link href="/materials">
                  <Button className="w-full" variant="outline">
                    Browse Materials
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
