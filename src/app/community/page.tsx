import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trophy, Upload, ThumbsUp, MessageSquare, Star, Shield } from "lucide-react";

const topContributors = [
  { rank: 1, name: "Chinedu O.", points: 2450, uploads: 89, university: "UNILAG" },
  { rank: 2, name: "Amaka T.", points: 2180, uploads: 76, university: "OAU" },
  { rank: 3, name: "Ibrahim M.", points: 1950, uploads: 68, university: "ABU" },
  { rank: 4, name: "Tola B.", points: 1720, uploads: 54, university: "UI" },
  { rank: 5, name: "Yusuf A.", points: 1540, uploads: 49, university: "UNN" },
];

const recentUploads = [
  { title: "Advanced Calculus Past Questions", course: "MTH 301", uploader: "Amaka T.", time: "2 hours ago", upvotes: 23 },
  { title: "Data Structures Lecture Notes", course: "CSC 201", uploader: "Chinedu O.", time: "5 hours ago", upvotes: 45 },
  { title: "Physics Lab Manual", course: "PHY 201", uploader: "Ibrahim M.", time: "yesterday", upvotes: 31 },
];

const topMaterials = [
  { title: "CSC 201 Past Questions 2020-2024", course: "CSC 201", rating: 4.9, reviews: 234, downloads: 1234 },
  { title: "MTH 301 Complete Lecture Notes", course: "MTH 301", rating: 4.8, reviews: 189, downloads: 987 },
  { title: "PHY 201 Formula Sheet", course: "PHY 201", rating: 4.7, reviews: 156, downloads: 856 },
];

export default function CommunityPage() {
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
            <nav className="flex items-center gap-4">
              <Link href="/materials" className="text-sm text-gray-600 hover:text-gray-900">Materials</Link>
              <Link href="/features" className="text-sm text-gray-600 hover:text-gray-900">Features</Link>
              <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">Pricing</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Community & Collaboration
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of Nigerian students sharing resources, building reputation, and studying smarter together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Leaderboard */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Top Contributors
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {topContributors.map((user) => (
                  <div key={user.rank} className="p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      user.rank === 1 ? "bg-yellow-500" :
                      user.rank === 2 ? "bg-gray-400" :
                      user.rank === 3 ? "bg-orange-600" : "bg-gray-300"
                    }`}>
                      {user.rank}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.university} • {user.uploads} uploads</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{user.points}</p>
                      <p className="text-xs text-gray-500">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mt-6 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Community Guidelines
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Upload only legitimate academic materials
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Rate and review materials honestly
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Respect copyright and attribution
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  Help others in discussions
                </li>
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Uploads */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Upload className="w-5 h-5 text-blue-600" />
                  Recent Uploads
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {recentUploads.map((upload, index) => (
                  <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{upload.title}</h3>
                        <p className="text-sm text-gray-600">{upload.course} • Uploaded by {upload.uploader} • {upload.time}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <ThumbsUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-600">{upload.upvotes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top-Rated Materials */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Top-Rated Materials
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {topMaterials.map((material, index) => (
                  <div key={index} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{material.title}</h3>
                        <p className="text-sm text-gray-600">{material.course} • {material.reviews} reviews • {material.downloads} downloads</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-medium text-gray-900">{material.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Discussion Forum Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                Community Discussions
              </h2>
              <div className="text-center py-12 text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Discussion forum coming soon!</p>
                <p className="text-sm mt-2">Connect with fellow students and get your questions answered.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
