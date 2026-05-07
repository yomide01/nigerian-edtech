"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockMaterials = [
  { id: 1, title: "Data Structures Lecture Notes", course: "CSC 201", type: "Lecture Note", lecturer: "Prof. Smith", downloads: 234, upvotes: 45, verified: true },
  { id: 2, title: "Past Questions 2023-2024", course: "CSC 201", type: "Past Question", lecturer: "Prof. Smith", downloads: 567, upvotes: 89, verified: true },
  { id: 3, title: "Algorithms Lab Manual", course: "CSC 201", type: "Lab Manual", lecturer: "Dr. Johnson", downloads: 123, upvotes: 32, verified: false },
  { id: 4, title: "Advanced Calculus Notes", course: "MTH 301", type: "Lecture Note", lecturer: "Dr. Williams", downloads: 189, upvotes: 56, verified: true },
  { id: 5, title: "Fourier Series Handout", course: "MTH 301", type: "Handout", lecturer: "Dr. Williams", downloads: 98, upvotes: 23, verified: false },
  { id: 6, title: "Electromagnetism Past Questions", course: "PHY 201", type: "Past Question", lecturer: "Prof. Brown", downloads: 345, upvotes: 67, verified: true },
];

const materialTypes = ["All", "Lecture Note", "Past Question", "Lab Manual", "Handout", "Assignment"];

export default function MaterialsPage() {
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
              <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">Dashboard</Link>
              <Link href="/ai-tutor" className="text-sm text-gray-600 hover:text-gray-900">AI Tutor</Link>
              <Link href="/mock-test" className="text-sm text-gray-600 hover:text-gray-900">Mock Tests</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Materials Repository</h1>
            <p className="text-gray-600 mt-1">Browse and download study materials</p>
          </div>
          <Button className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700 text-white">
            Upload Material
          </Button>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="search"
                placeholder="Search materials..."
                className="w-full"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {materialTypes.map((type) => (
                <button
                  key={type}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    type === "All" 
                      ? "bg-green-600 text-white" 
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Materials List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="divide-y divide-gray-100">
            {mockMaterials.map((material) => (
              <div key={material.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{material.title}</h3>
                      {material.verified && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Verified
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{material.course}</span>
                      <span>•</span>
                      <span>{material.type}</span>
                      <span>•</span>
                      <span>{material.lecturer}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 mt-4 md:mt-0">
                    <div className="text-center">
                      <div className="text-sm font-semibold text-gray-900">↓ {material.downloads}</div>
                      <div className="text-xs text-gray-500">Downloads</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-green-600">▲ {material.upvotes}</div>
                      <div className="text-xs text-gray-500">Upvotes</div>
                    </div>
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination placeholder */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </main>
    </div>
  );
}
