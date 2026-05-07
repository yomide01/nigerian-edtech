"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { LayoutGrid, BookOpen, Brain, TestTube, TrendingUp, LogOut } from "lucide-react";

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

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .single();

      if (profile) {
        setUserName(profile.full_name || "Student");
      }

      // TODO: Fetch real data
      setStats({
        materialsAccessed: 0,
        aiChats: 0,
        mockTests: 0,
        studyStreak: 0,
      });
      setCourses([]);
      setMaterials([]);
      setLoading(false);
    };

    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header - Clean, minimal */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center shadow-sm">
                <span className="text-white font-semibold text-sm">E</span>
              </div>
              <span className="font-semibold text-lg text-gray-900 tracking-tight">EduNaija</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/dashboard" className="text-sm text-gray-900 font-medium">Dashboard</Link>
              <Link href="/materials" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Materials</Link>
              <Link href="/ai-tutor" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">AI Tutor</Link>
              <Link href="/mock-test" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Mock Tests</Link>
            </nav>

            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Hi, {userName}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => supabase.auth.signOut().then(() => router.push("/login"))}
                className="text-gray-600 hover:text-gray-900"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Welcome Section - Lots of whitespace */}
        <div className="mb-12">
          <h1 className="text-3xl font-normal text-gray-900 mb-2">
            Welcome back, {userName}
          </h1>
          <p className="text-gray-500 text-lg">Your academic journey, simplified.</p>
        </div>

        {/* Stats Grid - Clean, minimal cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Materials", value: stats.materialsAccessed, icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "AI Sessions", value: stats.aiChats, icon: Brain, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Mock Tests", value: stats.mockTests, icon: TestTube, color: "text-purple-600", bg: "bg-purple-50" },
            { label: "Day Streak", value: stats.studyStreak, icon: TrendingUp, color: "text-orange-600", bg: "bg-orange-50" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl p-6 hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-3xl font-light text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Courses Section */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-normal text-gray-900">My Courses</h2>
                <Link href="/materials" className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
                  Browse all →
                </Link>
              </div>

              {courses.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <LayoutGrid className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
                  <p className="text-gray-500 mb-6">Complete your profile to get started with course materials.</p>
                  <Link href="/profile">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-6">
                      Set Up Profile
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.map((course) => (
                    <div key={course.id} className="bg-white rounded-2xl p-6 hover:shadow-md transition-all duration-300 border border-gray-100 group cursor-pointer">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-emerald-600" />
                        </div>
                        <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
                          {course.materials_count} materials
                        </span>
                      </div>
                      <h3 className="font-medium text-gray-900 mb-1">{course.code}</h3>
                      <p className="text-sm text-gray-500">{course.title}</p>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Recent Materials */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-normal text-gray-900">Recent Materials</h2>
                <Link href="/materials/upload" className="text-sm text-emerald-600 hover:text-emerald-700 transition-colors">
                  Upload new →
                </Link>
              </div>

              {materials.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center border border-gray-100">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No materials yet</h3>
                  <p className="text-gray-500 mb-6">Upload your first study material to get started.</p>
                  <Link href="/materials/upload">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-6">
                      Upload Material
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {materials.map((material) => (
                    <div key={material.id} className="bg-white rounded-2xl p-5 hover:shadow-md transition-all duration-300 border border-gray-100 flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{material.title}</h3>
                          <p className="text-sm text-gray-500">{material.course_code} • {new Date(material.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-sm text-gray-400">↓ {material.downloads}</span>
                        <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity text-emerald-600">
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar - NotebookLM style */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-normal text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { label: "AI Tutor", href: "/ai-tutor", color: "from-emerald-500 to-teal-600" },
                  { label: "Mock Test", href: "/mock-test", color: "from-blue-500 to-indigo-600" },
                  { label: "Browse Materials", href: "/materials", color: "from-purple-500 to-pink-600" },
                ].map((action) => (
                  <Link key={action.label} href={action.href}>
                    <div className={`w-full p-4 bg-gradient-to-br ${action.color} rounded-xl text-white hover:shadow-lg transition-all duration-300 group`}>
                      <div className="font-medium">{action.label}</div>
                      <div className="text-sm opacity-80 mt-1">Get started →</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Study Tip */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
              <h3 className="text-lg font-normal text-gray-900 mb-2">💡 Study Tip</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Review your notes within 24 hours of class to improve long-term retention by up to 60%.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
