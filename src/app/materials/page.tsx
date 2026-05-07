"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

interface Material {
  id: string;
  title: string;
  course_code: string;
  material_type: string;
  downloads: number;
  created_at: string;
  file_url: string;
}

export default function MaterialsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Upload form state
  const [title, setTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [materialType, setMaterialType] = useState("lecture_note");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const checkUserAndLoad = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      // Load materials from Supabase
      const { data, error } = await supabase
        .from("materials")
        .select(`
          id,
          title,
          course_code,
          material_type,
          downloads,
          created_at,
          file_url
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading materials:", error);
      } else {
        setMaterials(data || []);
      }
      setLoading(false);
    };

    checkUserAndLoad();
  }, [router]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title || !courseCode) {
      setError("Please fill all required fields");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      // 1. Upload file to Supabase Storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("materials")
        .upload(fileName, file);

      if (uploadError) {
        setError(uploadError.message);
        setUploading(false);
        return;
      }

      // 2. Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("materials")
        .getPublicUrl(fileName);

      // 3. Save metadata to database
      const { error: dbError } = await supabase
        .from("materials")
        .insert({
          user_id: user.id,
          title,
          course_code: courseCode,
          material_type: materialType,
          file_url: publicUrl,
          file_type: file.type,
          file_size: file.size,
        });

      if (dbError) {
        setError(dbError.message);
      } else {
        setSuccess("Material uploaded successfully!");
        setTitle("");
        setCourseCode("");
        setMaterialType("lecture_note");
        setFile(null);
        // Reload materials
        const { data } = await supabase
          .from("materials")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        setMaterials(data || []);
      }
    } catch (err) {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDownload = async (material: Material) => {
    // Increment download count
    await supabase
      .from("materials")
      .update({ downloads: material.downloads + 1 })
      .eq("id", material.id);

    // Open file in new tab
    window.open(material.file_url, "_blank");
    
    // Reload to update count
    setMaterials(prev => 
      prev.map(m => 
        m.id === material.id ? { ...m, downloads: m.downloads + 1 } : m
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading materials...</div>
      </div>
    );
  }

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
            <nav className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">Dashboard</Link>
              <Link href="/ai-tutor" className="text-sm text-gray-600 hover:text-gray-900">AI Tutor</Link>
              <Link href="/mock-test" className="text-sm text-gray-600 hover:text-gray-900">Mock Tests</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload New Material</h2>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleUpload} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Data Structures Lecture Notes"
                  required
                />
              </div>
              <div>
                <Label htmlFor="courseCode">Course Code *</Label>
                <Input
                  id="courseCode"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  placeholder="e.g. CSC 201"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="materialType">Material Type</Label>
                <select
                  id="materialType"
                  value={materialType}
                  onChange={(e) => setMaterialType(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2"
                >
                  <option value="lecture_note">Lecture Note</option>
                  <option value="past_question">Past Question</option>
                  <option value="assignment">Assignment</option>
                  <option value="lab_manual">Lab Manual</option>
                  <option value="handout">Handout</option>
                </select>
              </div>
              <div>
                <Label htmlFor="file">File * (PDF, DOC, etc.)</Label>
                <Input
                  id="file"
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Upload Material"}
            </Button>
          </form>
        </div>

        {/* Materials List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Your Materials</h2>
          </div>

          {materials.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500 mb-4">No materials uploaded yet.</p>
              <p className="text-sm text-gray-400">Upload your first material using the form above!</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {materials.map((material) => (
                <div key={material.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{material.title}</h3>
                      <p className="text-sm text-gray-600">
                        {material.course_code} • {material.material_type.replace("_", " ")} • {new Date(material.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-500">↓ {material.downloads}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(material)}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
