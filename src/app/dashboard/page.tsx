"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

// Real data types
interface Course {
  id: string;
  code: string;
  title: string;
  materials_count: number;
}

interface Material {
  id: string;
  title: string;
  course_code: string;
  downloads: number;
  created_at: string;
}

interface Insight {
  course: string;
  topic: string;
  probability: number;
  trend: "high" | "medium" | "low";
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [stats, setStats] = useState({
    materialsAccessed: 0,
    aiChats: 0,
    mockTests: 0,
    studyStreak: 0,
  });
  const [courses, setCourses] = useState<Course[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      // Get user profile
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      if (profile) {
        setUserName(profile.full_name || "Student");
      }

      // TODO: Fetch real data from Supabase
      // For now, show empty state
      setStats({
        materialsAccessed: 0,
        aiChats: 0,
        mockTests: 0,
        studyStreak: 0,
      });
      setCourses([]);
      setMaterials([]);
      setInsights([]);
      setLoading(false);
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

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
              <span className="text-sm text-gray-600">Welcome, {userName}!</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => supabase.auth.signOut().then(() => router.push("/login"))}
              >
                Log out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-gray-900">{stats.materialsAccessed}</div>
            <div className="text-sm text-gray-600">Materials Accessed</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-green-600">{stats.aiChats}</div>
            <div className="text-sm text-gray-600">AI Tutor Sessions</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-blue-600">{stats.mockTests}</div>
            <div className="text-sm text-gray-600">Mock Tests Taken</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="text-3xl font-bold text-purple-600">{stats.studyStreak}</div>
            <div className="text-sm text-gray-600">Day Study Streak</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Courses */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
              </div>
              {courses.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-gray-500">No courses yet. Complete your profile to get started!</p>
                  <Link href="/profile">
                    <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
                      Set Up Profile
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {courses.map((course) => (
                    <div key={course.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{course.code}</h3>
                          <p className="text-sm text-gray-600">{course.title}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">{course.materials_count} materials</span>
                          <Link href={`/courses/${course.id}`}>
                            <Button size="sm" variant="outline">View</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Materials */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Recent Materials</h2>
              </div>
              {materials.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-gray-500">No materials uploaded yet.</p>
                  <Link href="/materials/upload">
                    <Button className="mt-4 bg-green-600 hover:bg-green-700 text-white">
                      Upload Material
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {materials.map((material) => (
                    <div key={material.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{material.title}</h3>
                          <p className="text-sm text-gray-600">{material.course_code}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-500">↓ {material.downloads}</span>
                          <Button size="sm" variant="outline">Download</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* AI Exam Predictions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Exam Predictions</h2>
                <p className="text-sm text-gray-600 mt-1">AI-powered insights</p>
              </div>
              <div className="p-6">
                {insights.length === 0 ? (
                  <p className="text-gray-500 text-sm">Complete courses to get predictions</p>
                ) : (
                  <div className="space-y-4">
                    {insights.map((insight, i) => (
                      <div key={i} className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">{insight.course}</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            insight.trend === 'high' ? 'bg-red-100 text-red-700' : 
                            insight.trend === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-green-100 text-green-700'
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
                )}
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
