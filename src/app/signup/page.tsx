import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BookOpen, ArrowLeft } from "lucide-react";

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
  "University of Port Harcourt (UNIPORT)",
  "Federal University of Technology, Owerri (FUTO)",
  "University of Agriculture, Abeokuta (UNAAB)",
  "Ladoke Akintola University of Technology (LAUTECH)",
  "Ekiti State University (EKSU)",
  "Rivers State University (RSU)",
  "Bayero University Kano (BUK)",
  "Nnamdi Azikiwe University (UNIZIK)",
  "University of Uyo (UNIUYO)",
  "Federal University, Dutse (FUD)",
];

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-2xl text-gray-900">EduNaija</span>
        </Link>
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-green-600 hover:text-green-500">
            Log in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
          <form className="space-y-6" action="#" method="POST">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full name
              </Label>
              <div className="mt-1">
                <Input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  placeholder="John Doe"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </Label>
              <div className="mt-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="you@university.edu.ng"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </Label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  placeholder="••••••••"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* University Selection */}
            <div>
              <Label htmlFor="university" className="block text-sm font-medium text-gray-700">
                Select your university
              </Label>
              <div className="mt-1">
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose your university" />
                  </SelectTrigger>
                  <SelectContent>
                    {nigerianUniversities.map((uni) => (
                      <SelectItem key={uni} value={uni}>
                        {uni}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Your university determines the materials and community you'll access
              </p>
            </div>

            {/* Terms */}
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{" "}
                <Link href="/terms" className="text-green-600 hover:text-green-500">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-green-600 hover:text-green-500">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base font-semibold"
              >
                Create account
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Free plan includes</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div className="flex items-center gap-1">
                <span className="text-green-500">✓</span> Upload materials
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-500">✓</span> AI tutor access
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-500">✓</span> Community access
              </div>
              <div className="flex items-center gap-1">
                <span className="text-green-500">✓</span> Mock tests
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
