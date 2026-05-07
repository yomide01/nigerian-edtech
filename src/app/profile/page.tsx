"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const nigerianUniversities = [
  { id: "uni_1", name: "University of Lagos (UNILAG)" },
  { id: "uni_2", name: "Obafemi Awolowo University (OAU)" },
  { id: "uni_3", name: "University of Ibadan (UI)" },
  { id: "uni_4", name: "Lagos State University (LASU)" },
  { id: "uni_5", name: "University of Nigeria, Nsukka (UNN)" },
  { id: "uni_6", name: "Ahmadu Bello University (ABU)" },
  { id: "uni_7", name: "University of Benin (UNIBEN)" },
  { id: "uni_8", name: "Covenant University (CU)" },
  { id: "uni_9", name: "Federal University of Technology, Akure (FUTA)" },
  { id: "uni_10", name: "University of Ilorin (UNILORIN)" },
];

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const [formData, setFormData] = useState({
    full_name: "",
    university_id: "",
    faculty: "",
    department: "",
    level: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setFormData({
          full_name: data.full_name || "",
          university_id: data.university_id || "",
          faculty: data.faculty || "",
          department: data.department || "",
          level: data.level || "",
        });
      }
      setLoading(false);
    };
    loadProfile();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          full_name: formData.full_name,
          university_id: formData.university_id,
          faculty: formData.faculty,
          department: formData.department,
          level: formData.level,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (updateError) {
        setError(updateError.message);
      } else {
        setSuccess("Profile updated successfully!");
        setTimeout(() => router.push("/dashboard"), 1500);
      }
    } catch (err) {
      setError("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading profile...</div>
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
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Complete Your Profile</h1>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-6">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
            {/* Full Name */}
            <div>
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                placeholder="Your full name"
                required
              />
            </div>

            {/* University */}
            <div>
              <Label htmlFor="university">University</Label>
              <select
                id="university"
                value={formData.university_id}
                onChange={(e) => setFormData({ ...formData, university_id: e.target.value })}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              >
                <option value="">Select your university</option>
                {nigerianUniversities.map((uni) => (
                  <option key={uni.id} value={uni.id}>{uni.name}</option>
                ))}
              </select>
            </div>

            {/* Faculty */}
            <div>
              <Label htmlFor="faculty">Faculty</Label>
              <Input
                id="faculty"
                value={formData.faculty}
                onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                placeholder="e.g. Faculty of Science"
              />
            </div>

            {/* Department */}
            <div>
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="e.g. Computer Science"
              />
            </div>

            {/* Level */}
            <div>
              <Label htmlFor="level">Level</Label>
              <select
                id="level"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option value="">Select your level</option>
                <option value="100">100 Level</option>
                <option value="200">200 Level</option>
                <option value="300">300 Level</option>
                <option value="400">400 Level</option>
                <option value="500">500 Level</option>
              </select>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Profile"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
}
